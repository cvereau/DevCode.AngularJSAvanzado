(function() {
    'use strict';

    angular
        .module('app.avengers')
        .run(appRun);


    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                name: 'avengers',
                config: {
                    url: '/avengers',
                    templateUrl: 'app/avengers/avengers.html',
                    controller: 'Avengers',
                    controllerAs: 'vm',
                    title: 'avengers',
                    settings: {
                        nav: 2,
                        content: '<i class="glyphicon glyphicon-lock"></i> Avengers'
                    }
                }
            }
        ];
    }
})();
