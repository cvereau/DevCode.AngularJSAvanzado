/**
 * Created by cvereau on 12/16/15.
 */
(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$timeout','config','logger'];
    function Shell($timeout, config, logger){

        var vm = this;
        vm.title = config.appTitle;
        vm.showSplash = true;


        activate();

        function activate(){
            logger.success(config.appTitle + ' loaded!', null);

            hideSplash();
        }

        function hideSplash(){
            $timeout(function () {
                vm.showSplash = false;
            },1000);
        }
    };
}());