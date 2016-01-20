/**
 * Created by cvereau on 12/16/15.
 */
(function () {
    'use strict';

    angular.module('app', [
       //Independientes
        'app.core',
        'app.widgets',

        'app.avengers',
        'app.dashboard',
        'app.layout'
    ]);
}());