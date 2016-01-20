/**
 * Created by cvereau on 1/16/16.
 */
(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('rtCandlestickChart', rtCandlestickChartControl);

    rtCandlestickChartControl.$inject = ['config'];

    function rtCandlestickChartControl(config){
        return {
            templateUrl: 'app/widgets/widgetCandlestickChart/rtCandlestickChartTemplate.html',
            link: function (scope, el, attrs) {
                scope.metric = attrs.metric;
                scope.options = {
                    legend: {
                        position: 'none'
                    },
                    vAxis: {
                        maxValue: 100,
                        minValue: 0
                    },
                    hAxis: {
                        slandedText: false,
                        format: 'h:mm:ss',
                        maxTextLines: 1,
                        gridLines: {
                            count: 7
                        }
                    }
                };

                scope.startTime = null;
                scope.periodsOnChart = 5;
                scope.secondsPerPeriod = 5;

                scope.period = {
                    lowValue: 0,
                    firstValue: 0,
                    lastValue: 0,
                    highValue: 0,
                    startTime: null,
                    endTime: null
                };

                var widget = el.closest('.gridster-item');

                scope.options.width = widget.width();
                scope.options.height = widget.height();

                // monitorear el evento resize del widget
                widget.resize(function () {
                    scope.options.width = widget.width();
                    scope.options.height = widget.height();
                });

                scope.options.title = config.getNameForMetric(scope.metric);
                scope.initialized = false;

                scope.$on('socket', function(evt, data){
                    var value = Math.round(data[scope.metric]);
                    var d =  new Date(data.time);

                    if(!scope.initialized){
                        scope.data =  new google.visualization.DataTable();
                        scope.data.addColumn('timeofday', 'Time of Day');
                        for (var i = 0; i < 4; i++) {
                            scope.data.addColumn('number', 'Percent');
                        }

                        scope.startTime =  new Date(d);
                        scope.period.startTime =  new Date(d);
                        scope.period.endTime = new Date(d);
                        scope.period.endTime.setSeconds(scope.period.endTime.getSeconds() + scope.secondsPerPeriod);

                        scope.chart = new google.visualization.CandlestickChart(el[0]);

                        var startSecs = scope.period.startTime.getSeconds() - scope.secondsPerPeriod;
                        if(startSecs < 0) startSecs = 0;
                        scope.data.addRow([[scope.period.startTime.getHours(), scope.period.startTime.getMinutes(), startSecs],
                            0,0,0,0]);
                    }


                    if(!scope.initialized || d >= scope.period.endTime){

                        scope.initialized = true;

                        //set up a new period
                        scope.period.lowValue =
                            scope.period.firstValue =
                                scope.period.lastValue =
                                    scope.period.highValue = value;

                        if(d >= scope.period.endTime){
                            scope.period.startTime.setSeconds(scope.period.startTime.getSeconds() + scope.secondsPerPeriod);
                            scope.period.endTime.setSeconds(scope.period.endTime.getSeconds() + scope.secondsPerPeriod);
                        }
                    }
                    else{
                        //update period values
                        if(value < scope.period.lowValue)
                            scope.period.lowValue = value;
                        if(value > scope.period.highValue)
                            scope.period.highValue = value;
                        scope.period.lastValue = value;

                        //remove the row for the current period
                        if (scope.data.getNumberOfRows() > 1)
                            scope.data.removeRow(scope.data.getNumberOfRows()-1);
                    }

                    //add the row for the current period
                    scope.data.addRow([[scope.period.startTime.getHours(), scope.period.startTime.getMinutes(), scope.period.startTime.getSeconds()],
                        scope.period.lowValue,
                        scope.period.firstValue,
                        scope.period.lastValue,
                        scope.period.highValue]);

                    var rowCount = scope.data.getNumberOfRows();
                    if(rowCount > scope.periodsOnChart){
                        scope.data.removeRow(0);
                        rowCount--;
                        scope.startTime.setSeconds(scope.startTime.getSeconds() + scope.secondsPerPeriod);
                    }

                    //set the baseline properly
                    var newBaseline = new Date(scope.startTime);
                    newBaseline.setSeconds(newBaseline.getSeconds() + (scope.periodsOnChart - 1) * scope.secondsPerPeriod);
                    scope.options.hAxis.baseline = [newBaseline.getHours(),
                        newBaseline.getMinutes(), newBaseline.getSeconds()];

                    //draw the chart now that options and data are set up
                    scope.chart.draw(scope.data, scope.options);
                });

            }
        };
    }
}());