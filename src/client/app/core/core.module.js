/**
 * Created by cvereau on 12/15/15.
 */
(function () {
    'use strict';

    angular.module('app.core',[
       //Angular modules
        'ngSanitize',

       //Componentes reutilizables
        'app.data',
        'blocks.exception',
        'blocks.logger',
        'blocks.router',

       //Librerias terceras
        'ui.router'
    ]);
}());