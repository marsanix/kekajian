angular.module('app.routes.info_kajian.detail', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('tabsKajian.detailKajian', {
        url: '/detailKajian/{id}',
        views: {
          'tab1': {
            templateUrl: 'templates/info-kajian/info-kajian-detail.html',
            controller: 'detailKajianCtrl as vm'
          }
        }
      })

  });