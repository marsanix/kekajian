(function () {
    'use strict';

    angular.module('app.routes.bagi_kajian.upload_photo', [])

      .config(function ($stateProvider, $urlRouterProvider) {

          // Ionic uses AngularUI Router which uses the concept of states
          // Learn more here: https://github.com/angular-ui/ui-router
          // Set up the various states which the app can be in.
          // Each state's controller can be found in controllers.js
          $stateProvider

            .state('uploadPhoto', {
                url: '/uploadPhoto',
                templateUrl: 'templates/uploadPhoto.html',
                controller: 'uploadPhotoCtrl as vm'
            })

      });

  })();