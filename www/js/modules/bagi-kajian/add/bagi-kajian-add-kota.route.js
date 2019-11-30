angular.module('app.routes.bagi_kajian.add_kota', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('pilihKota', {
          url: '/bajiKajianAddPilihKota',
          requireLogin: true,
          templateUrl: 'templates/bagi-kajian/bagi-kajian-add-kota.html',
          controller: 'pilihKotaCtrl as vm'
        })

  });