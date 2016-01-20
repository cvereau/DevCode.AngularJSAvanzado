/**
 * Created by cvereau on 1/16/16.
 */
(function () {
   'use strict';
    
    angular
        .module('app.widgets')
        .directive('rtLineChart', rtLineChartControl);

    rtLineChartControl.$inject = ['config'];
    
    function rtLineChartControl(config){
        return {
            templateUrl: 'app/widgets/widgetLineChart/rtLineChartTemplate.html',
            link: function (scope,el,attrs) {
                scope.metric = attrs.metric; //cpuPct
                scope.options = {
                    legend:{
                        position: 'none'
                    },
                    vAxis: {
                        maxValue: 100,
                        minValue: 0
                    },
                    hAxis: {
                        slantedText: false,
                        format: 'h:mm:ss',
                        maxTextLines: 1,
                        gridlines: {
                            count: 20
                        }
                    }
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
                    if(!scope.initialized){
                        scope.data = new google.visualization.DataTable();
                        scope.data.addColumn('timeofday','Time of Day');
                        scope.data.addColumn('number','Value');

                        scope.chart = new google.visualization.LineChart(el[0]);
                        scope.initialized = true;
                    }

                    var d = new Date(data.time);
                    scope.data.addRow([[d.getHours(),
                                        d.getMinutes(),
                                        d.getSeconds()],Math.round(data[scope.metric])]);

                    var rowCount = scope.data.getNumberOfRows();
                    if(rowCount < 20){
                        scope.options.hAxis.baseline =
                                [d.getHours(),
                                d.getMinutes(),
                                d.getSeconds() + 20 - rowCount];
                    }
                    else{
                        scope.options.hAxis.baseline = [d.getHours(),
                                                        d.getMinutes(),
                                                        d.getSeconds()
                                                       ];
                    }

                    if(rowCount > 20){
                        scope.data.removeRow(0);
                    }

                    scope.chart.draw(scope.data, scope.options);
                });

            }
        }
    }
}());