angular.module('app.routes.bagi_kajian.add', ['app.routes.bagi_kajian.add_kota'])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('bagiKajian', {
        cache: false,
        url: '/bagiKajian',
        requireLogin: true,
        templateUrl: 'templates/bagi-kajian/bagi-kajian-add.html',
        controller: 'bagiKajianCtrl as vm'
      })

  });