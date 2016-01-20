/**
 * Created by cvereau on 1/16/16.
 */
(function () {
    'use strict';
    
    angular
        .module('app.widgets')
        .directive('appSecurityMonitor', appSecurityMonitorControl);
    
    function appSecurityMonitorControl(){
        return{
           templateUrl: 'app/widgets/widgetSecurityMonitorControl/appSecurityMonitorTemplate.html',
           link: function (scope,el,attrs) {
               scope.filter = 'All';
               scope.messages = [];
               scope.autoscroll = true;
               scope.$on('socketSecurityMonitor', function (evt, data) {

                   if(scope.filter == 'All'
                    || scope.filter == data.event){

                    scope.$apply(function () {
                        if(data.event == 'Sign On'){
                            data.colorClass = 'non-error';
                        }
                        scope.messages.push(data);
                    });
                   }

                   if(scope.autoscroll){
                       el.find('div')[0].scrollTop = el.find('div')[0].scrollHeight;
                   }

               });

               //setear en on u off el autoscroll basado en el scrolling el usuario
               el.find('div').scroll(function (event, data) {
                  if(this.scrollTop < this.scrollHeight - $(this).height())
                        scope.autoscroll = false;
                  else
                        scope.autoscroll = true;
               });
           }
        };

    }
}());