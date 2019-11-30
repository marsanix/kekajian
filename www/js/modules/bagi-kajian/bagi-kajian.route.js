angular.module('app.routes.bagi_kajian', [
    'app.routes.bagi_kajian.add',
    'app.routes.bagi_kajian.edit',
    'app.routes.bagi_kajian.upload_photo'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider
  
  .state('daftarBagiKajian', {
    cache: false,
    requireLogin: true,
    url: '/daftarBagiKajian',    
    templateUrl: 'templates/bagi-kajian/bagi-kajian.html',
    controller: 'daftarBagiKajianCtrl as vm'
  })


});