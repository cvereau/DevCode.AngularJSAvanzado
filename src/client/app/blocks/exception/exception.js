/**
 * Created by cvereau on 12/15/15.
 */
(function () {
    'use strict';

    angular.module('blocks.exception')
        .factory('exception', exception);

    function exception(logger){
        var service = {
            catcher: catcher
        };

        return service;

        function catcher(message){
            return function(reason){
                logger.error(message, reason);
            }
        }
    }
}());