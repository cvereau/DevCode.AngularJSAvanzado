/**
 * Created by cvereau on 12/16/15.
 */
(function(){
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['$state','routehelper'];

    function Sidebar($state, routehelper){
        var vm = this;
        var routes = routehelper.getRoutes();
        vm.isCurrent = isCurrent;

        activate();

        function activate(){
            getNavRoutes();
        }

        function getNavRoutes(){
            vm.navRoutes = routes.filter(function (r) {
                return r.settings && r.settings.nav;
            }).sort(function (r1,r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function isCurrent(route){
            if(!route.title || !$state.current || !$state.current.title){
                return  '';
            }

            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length)
                                    === menuName ? 'current' : '';
        }
    }
}());

