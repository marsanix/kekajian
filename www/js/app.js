// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 
                      'ngCordova',
                      'ngStorage',
                      'angular-jwt',
                      'angularMoment',
                      'app.controllers', 
                      'app.routes', 
                      'app.directives', 
                      'app.factories', 
                      'app.services'
                    ])

.config(function ($ionicConfigProvider, $sceDelegateProvider, jwtOptionsProvider, $httpProvider) {

  jwtOptionsProvider.config({
    whiteListedDomains: ['localhost', '127.0.0.1', 'kekajian.com']
  });

  $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

  $httpProvider.defaults.useXDomain = true; //enable cross domain
  $httpProvider.defaults.headers.common = 'Content-Type: application/json';

  $httpProvider.interceptors.push('HttpInterceptor');

  delete $httpProvider.defaults.headers.common['X-Requested-With'];

})

.run(function ($ionicPlatform, $rootScope, $state, $localStorage, Account, amMoment) {

  amMoment.changeLocale('id');

  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if (toState.requireLogin !== undefined) {
      var requireLogin = toState.requireLogin;          
      if (requireLogin === true && ($localStorage.token === undefined || $localStorage.token === null)) {
        $state.transitionTo("masuk");
        event.preventDefault();
      }
    }       

  });

  $rootScope.isLogin = Account.isLogin();
  $rootScope.keluar = keluar;

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }    

  });

  angular.isUndefinedOrNull = function (val) {
    return angular.isUndefined(val) || val === null
  };

  function keluar() {
    
    Account.logout(function(res){
      console.log('keluar.res', res);
    },
    function(err) {
      console.log('keluar.err', err);
    });

    delete $localStorage.token;
    delete $localStorage.user;
    $state.transitionTo("masuk");

  }
  
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});