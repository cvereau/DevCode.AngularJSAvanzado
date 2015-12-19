/**
 * Created by cvereau on 12/15/15.
 */
(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[NG-Avengers Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Avengers Angular Demo',
        version: '1.0.0'
    };

    core.value('config', config);

    core.config(configure);

    /* @ngInject */
    function configure ($logProvider,
                        $urlRouterProvider,
                        $stateProvider,
                        routehelperConfigProvider,
                        exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)

        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Avengers: ';


        var resolveAlways = {
            ready: function(dataservice) {
                return dataservice.ready();
            }
            // ready: ['dataservice', function (dataservice) {
            //    return dataservice.ready();
            // }]
        };

        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }
})();
