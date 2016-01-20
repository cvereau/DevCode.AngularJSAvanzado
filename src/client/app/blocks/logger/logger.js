/**
 * Created by cvereau on 12/15/15.
 */
(function () {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log','toastr'];
    //log hacia la consola del browser
    //notificar mediante toastr a la aplicacion
    // Log: error, info, success, warning
    function logger($log, toastr){
        // patron revealing-module

        var service = {
            showToasts: true,

            error: error,
            info: info,
            success: success,
            warning: warning,

            //defrente a consola, bypass toastr
            log: $log.log
        };

        return service;
        //////////////////////////

        //metodo para loguear errores
        function error(message, data, title){
            toastr.error(message, title);
            $log.error('Error : ' + message, data);
        }
        ///metodo para loggear informacion
        function info(message, data, title){
            toastr.info(message,title);
            $log.info('Info : ' + message, data);
        }

        function success(message, data, title){
            toastr.success(message,title);
            $log.info('Success : ' + message, data);
        }

        function success2(message, data, title){
            //notificar y logear de otra manera
        }

        function warning(message, data, title){
            toastr.warning(message,title);
            $log.warn('Warning : ' + message, data);
        }


    }
}());