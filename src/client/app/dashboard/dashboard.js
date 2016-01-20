(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dataservice', 'logger','$rootScope'];

    function Dashboard($q, dataservice, logger, $rootScope) {

        /*jshint validthis: true */
        var vm = this;

        vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };
        vm.avengerCount = 0;
        vm.avengers = [];
        vm.title = 'Dashboard';
        vm.item = {};
        vm.socketInitialized = false;
        vm.securityMonitorInitialized = false;

        activate();

        function activate() {
            initializeSocket();
            setGridsterOptions();
            var promises = [getAvengerCount(), getAvengersCast()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function initializeSocket(){
            if(!vm.socketInitialized){
                var socket = io.connect();

                socket.on('metricServiceDataEvent', function (data) {
                    $rootScope.$broadcast('socket', data);
                });

                socket.on('security event', function(msg){
                    $rootScope.$broadcast('socketSecurityMonitor', msg);
                });


                vm.socketInitialized = true;
            }
        }


        function setGridsterOptions(){
            vm.item.gaugeSizeX = 1;
            vm.item.gaugeSizeY = 1;

            vm.item.lcSizeX = 2;
            vm.item.lcSizeY = 1;

            vm.item.csSizeX = 2;
            vm.item.csSizeY = 1;

            vm.item.smSizeX = 3;
            vm.item.smSizeY = 3;
        }

        function getAvengerCount() {
            return dataservice.getAvengerCount().then(function(data) {
                vm.avengerCount = data;
                return vm.avengerCount;
            });
        }

        function getAvengersCast() {
            return dataservice.getAvengersCast().then(function(data) {
                vm.avengers = data;
                return vm.avengers;
            });
        }
    }
})();
