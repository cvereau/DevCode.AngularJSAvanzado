/**
 * Created by cvereau on 12/16/15.
 */
(function () {
    'use strict';

    angular.module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$rootScope','$state','logger','routehelperConfig'];

    function routehelperConfig(){
        this.config = {
           $stateProvider : undefined,
           $urlRouterProvider: undefined,
           resolveAlways: function () {
               //ejecutar la carga de cierta data UNA SOLA VEZ en la app
           },
            docTitle : undefined
        };

        this.$get = function () {
          return{
              config: this.config
          }
        };
    }

    function routehelper($rootScope, $state, logger, routehelperConfig){
       var routes = [];

       var $urlRouterProvider = routehelperConfig.config.$urlRouterProvider;
       var $stateProvider = routehelperConfig.config.$stateProvider;

       var service = {
         configureRoutes: configureRoutes,
         getRoutes: getRoutes
       };

        init();

        return service;

        function configureRoutes(routes){
            routes.forEach(function (route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {},
                                        routehelperConfig.resolveAlways);

                $stateProvider.state(route.name, route.config);
                $urlRouterProvider.otherwise("/");
            });
        }

        function getRoutes(){
            for (var i = 0; i < $state.get().length; i++) {
                var route = $state.get()[i];
                var isRoute = !!route.title;
                if(isRoute){
                    routes.push(route);
                }
            }

            return routes;
        }

        function init(){
            updateDocTitle();
        }

        function updateDocTitle(){
            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, fromState) {
                   var title = routehelperConfig.config.docTitle + ' ' +
                       (toState.title || '');
                    $rootScope.title = title;
                });
        }
    };
}());