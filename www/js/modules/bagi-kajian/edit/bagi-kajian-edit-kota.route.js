angular.module('app.routes.bagi_kajian.edit_kota', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('pilihKota2', {
          requireLogin: true,
          url: '/bagiKajianEditPilihKota',
          templateUrl: 'templates/bagi-kajian/bagi-kajian-edit-kota.html',
          controller: 'pilihKota2Ctrl as vm'
        })

  });