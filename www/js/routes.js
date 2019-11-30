angular.module('app.routes', [
  'app.routes.info_kajian',
  'app.routes.bagi_kajian',
  'app.routes.login',
  'app.routes.daftar',
])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

  // .state('tabsKajian.infoKajian', {
  //   url: '/infoKajian',
  //   views: {
  //     'tab1': {
  //       templateUrl: 'templates/infoKajian.html',
  //       controller: 'infoKajianCtrl as vm'
  //     }
  //   }
  // })

  // .state('tabsKajian.detailKajian', {
  //   url: '/detailKajian',
  //   views: {
  //     'tab1': {
  //       templateUrl: 'templates/detailKajian.html',
  //       controller: 'detailKajianCtrl as vm'
  //     }
  //   }
  // })

  .state('tabsKajian.detailKajianSaya', {
    url: '/detailKajianSaya',
    views: {
      'tab3': {
        templateUrl: 'templates/detailKajianSaya.html',
        controller: 'detailKajianSayaCtrl as vm'
      }
    }
  })

  .state('lokasiKajian', {
    url: '/lokasiKajian',
    templateUrl: 'templates/lokasiKajian.html',
    controller: 'lokasiKajianCtrl as vm'
  })

  .state('lokasiKajianSaya', {
    url: '/lokasiKajianSaya',
    templateUrl: 'templates/lokasiKajianSaya.html',
    controller: 'lokasiKajianSayaCtrl as vm'
  })

  .state('videoKajian', {
    url: '/videoKajian/{id}',
    templateUrl: 'templates/info-kajian/info-kajian-video.html',
    controller: 'videoKajianCtrl as vm'
  })

  .state('profil', {
    url: '/profil',
    templateUrl: 'templates/profil.html',
    controller: 'profilCtrl as vm'
  })

  .state('tabsKajian.kajianTerdekat', {
    url: '/kajianTerdekat',
    views: {
      'tab2': {
        templateUrl: 'templates/kajianTerdekat.html',
        controller: 'kajianTerdekatCtrl as vm'
      }
    }
  })

  .state('tabsKajian.jadwalSaya', {
    url: '/jadwalSaya',
    views: {
      'tab3': {
        templateUrl: 'templates/jadwalSaya.html',
        controller: 'jadwalSayaCtrl as vm'
      }
    }
  })

  // .state('bagiKajianEdit', {
  //   url: '/bagiKajianEdit/{id}',
  //   templateUrl: 'templates/bagiKajianEdit.html',
  //   controller: 'bagiKajianEditCtrl as vm'
  // })

  // .state('uploadPhoto', {
  //   url: '/uploadPhoto',
  //   templateUrl: 'templates/uploadPhoto.html',
  //   controller: 'uploadPhotoCtrl as vm'
  // })

  .state('uploadPhotoEdit', {
    url: '/uploadPhotoEdit',
    templateUrl: 'templates/uploadPhotoEdit.html',
    controller: 'uploadPhotoEditCtrl as vm'
  })

  .state('cariKajian', {
    url: '/cariKajian',
    templateUrl: 'templates/cariKajian.html',
    controller: 'cariKajianCtrl as vm'
  })

  .state('tagsKajian', {
    url: '/tagsKajian',
    templateUrl: 'templates/tagsKajian.html',
    controller: 'tagsKajianCtrl as vm'
  })

  .state('tagsKajianBagi', {
    url: '/tagsKajianBagi',
    templateUrl: 'templates/tagsKajianBagi.html',
    controller: 'tagsKajianBagiCtrl as vm'
  })

  .state('tagsKajianBagiEdit', {
    url: '/tagsKajianBagiEdit',
    templateUrl: 'templates/tagsKajianBagiEdit.html',
    controller: 'tagsKajianBagiEditCtrl as vm'
  })

  .state('tabsKajian', {
    url: '/tabs',
    templateUrl: 'templates/tabsKajian.html',
    abstract:true
  })

  // .state('daftar', {
  //   url: '/daftar',
  //   templateUrl: 'templates/daftar.html',
  //   controller: 'daftarCtrl as vm'
  // })

  .state('tentang', {
    url: '/tentang',
    templateUrl: 'templates/tentang.html',
    controller: 'tentangCtrl as vm'
  })

  // .state('pilihKota', {
  //   url: '/bajiKajianAddPilihKota',
  //   templateUrl: 'templates/pilihKota.html',
  //   controller: 'pilihKotaCtrl as vm'
  // })

  // .state('pilihKota2', {
  //   url: '/bagiKajianEditPilihKota',
  //   templateUrl: 'templates/pilihKota2.html',
  //   controller: 'pilihKota2Ctrl as vm'
  // })

$urlRouterProvider.otherwise('/tabs/infoKajian')


});