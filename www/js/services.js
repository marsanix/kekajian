angular.module('app.services', [])

.constant('Config', {
  AppID: 'keKajian',
  AppName: 'keKajian',
  AppDesc: 'Info Kajian Sunnah',
  AppVersion: '0.1.0',
  ApiUrl: 'https://kekajian.com/api',
  ApiSocketUrl: 'ws://localhost:8015/api',
})

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);