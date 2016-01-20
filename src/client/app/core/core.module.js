/**
 * Created by cvereau on 12/16/15.
 */
(function () {
    'use strict';

    angular.module('app.core', [
       //modulos de Angular
        'ngSanitize',

       //Componentes Independientes
        'blocks.exception',
        'blocks.logger',
        'blocks.router',

       //Componentes Dependientes o de Negocio
        'app.data',

       //modulos terceros
        'ui.router'
    ]);
}());