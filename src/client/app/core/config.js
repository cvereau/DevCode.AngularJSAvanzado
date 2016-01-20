/**
 * Created by cvereau on 12/16/15.
 */
(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    function toastrConfig(toastr){
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[NG-Avengers Error] ', //configurar el exceptionHandler decorator
        appTitle: 'Avengers Angular Demo',
        version: '1.0.0',
        getNameForMetric: getNameForMetric
    };

    var transitFirebaseRef = new Firebase("https://publicdata-transit.firebaseio.com/");

    var getGeoFireInstance = function () {
      return new GeoFire(transitFirebaseRef.child('_geofire'));
    };

    var fireBaseConfig = {
        transitFirebaseRef: transitFirebaseRef,
        getGeoFireInstance: getGeoFireInstance
    };

    core.value('config', config);
    core.value('fireBaseConfig', fireBaseConfig);

    core.config(routerConfig);

    function routerConfig($logProvider,
                          $urlRouterProvider,
                          $stateProvider,
                          routehelperConfigProvider,
                          exceptionHandlerProvider){

        if($logProvider.debugEnabled){
            $logProvider.debugEnabled(true);
        }

        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        routehelperConfigProvider.config.docTitle = "NG-Avengers: ";

        var resolveAlways = {
           ready: function(dataservice){
                return dataservice.ready();
           }
        };

        //routehelperConfigProvider.config.resolveAlways = resolveAlways;

        exceptionHandlerProvider.configure(config.appErrorPrefix);

    }

    function getNameForMetric(metric){
        var name;
        switch(metric){
            case 'cpuPct':
                name = 'CPU %';
                break;
            case 'bandWidth':
                name = 'BandWidth %';
                break;
            default:
                name = '';
        }

        return name;
    }
}());