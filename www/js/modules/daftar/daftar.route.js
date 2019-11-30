(function () {
    'use strict';

    angular.module('app.routes.daftar', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        .state('daftar', {
            url: '/daftar',
            templateUrl: 'templates/daftar.html',
            controller: 'daftarCtrl as vm'
        })

    });

})();