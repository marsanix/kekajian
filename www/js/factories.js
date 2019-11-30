angular.module('app.factories', [
  'app.factories.info_kajian',
  'app.factories.bagi_kajian'
])

.factory('HttpInterceptor', function ($q, $localStorage, $location, $rootScope) {
  return {
    request: function (config) {

      config.headers = config.headers || {};
      if ($localStorage.token) {
        config.headers.Authorization = 'Bearer ' + $localStorage.token;
      }

      // config.headers['Access-Control-Allow-Origin'] = '*';
      // config.headers['Access-Control-Allow-Methods'] = 'POST, GET, DELETE, OPTIONS, PUT';
      // config.headers['Cache-Control'] = 'max-age=0';
      // config.headers['Accept'] = '*/*';

      return config;
    },
    response: function (response) {
      return response || $q.when(response);
    },
    'responseError': function (response) {
      if (response.status === 401 || response.status === 403 || response.status === 550) {
        //if(response.status === 401 || response.status === 403) {
        //$localStorage.token = null;
        //localStorage.removeItem('ngStorage-token');
        //$location.path('/');
        //window.location = document.location + '/signin';
        //$location.path('/signin');
        /*if(response.status === 550) {
            $location.path('/');
        } else {
            $location.path('/signin');
        }*/
        //$location.path('/');
        //console.log('response.status', response.status);
      }

      console.log('response', response);

      if (response.status === -1) {
        delete $localStorage.token;
        delete $localStorage.user;
        $rootScope.isLogin = false;
        // $location.path('masuk');
        //$state.transitionTo("masuk");
      }
      return $q.reject(response);
    }
  };
})

.factory('Account', AccountFactory);

AccountFactory.$inject = ['$q', '$http', '$rootScope', '$state', '$localStorage', '$location', 'Config', 'jwtHelper'];

function AccountFactory($q, $http, $rootScope, $state, $localStorage, $location, Config, jwtHelper) {

  var islogin;

  function user() {
    return $localStorage.user;
  }

  function isLogin() {
    var token = $localStorage.token;
    $rootScope.token = token;
    if (typeof token === 'undefined') {
      $state.transitionTo("masuk");
      // window.location = ('auth.html');
    } else {
      return true;
    }
  }

  function getAccountFromToken() {
    var token = $localStorage.token;
    var account = {};
    if (typeof token !== 'undefined') {

      account = token && jwtHelper.decodeToken(token);

      //var encoded = token.split('.')[1];
      //account = JSON.parse(urlBase64Decode(encoded));
    }
    return account;
  }

  function isAdmin() {
    var user = $localStorage.user;
    if (user) {
      if (user.group === -1 || user.group === 1) {
        return true;
      }
    }
    return false;
  }

  function isProvider() {
    var user = $localStorage.user;
    if (user) {
      if (user.group === 2) {
        return true;
      }
    }
    return false;
  }

  var currentAccount = getAccountFromToken();

  function reloadToken() {
    if ($localStorage.token) {
      $http.put(Config.ApiUrl + '/authorizations/current').success(function (res) {
        // console.log('res.data', res.data);
        $localStorage.token = res.data.token;
      }).error(function (err) {
        // console.log('err', err);
        if (err && err.status_code === 500) {
          delete $localStorage.token;
          delete $localStorage.user;
          $state.transitionTo("masuk");
          // window.location = 'auth.html';
        }
      });
    }
  }

  return {
    save: function (data, success, error) {
      $http.post(Config.ApiUrl + '/register', data).success(success).error(error);
    },
    me: function (success, error) {
      $http.get(Config.ApiUrl + '/user/posts').success(success).error(error);
    },
    refreshToken: function (success, error) {
      $http.put(Config.ApiUrl + '/authorizations/current').success(success).error(error);
    },
    login: function (data, success, error) {
      delete $http.defaults.headers.common.Authorization;
      $http.post(Config.ApiUrl + '/login', data).then(success, error);
    },
    logout: function (success, error) {
      if ($localStorage.token) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.token;
      }
      $http.delete(Config.ApiUrl + '/logout').success(success).error(error);
      delete $http.defaults.headers.common.Authorization;
      delete $localStorage.token;
      delete $localStorage.user;
      success();

    },
    isLogin: isLogin,
    isAdmin: isAdmin,
    isProvider: isProvider,
    defaultPage: 'dashboard',
    getAccountFromToken: getAccountFromToken,
    user: user,
    reloadToken: reloadToken
  };

}