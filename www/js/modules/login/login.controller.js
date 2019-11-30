angular.module('app.controller.login', [
	'app.controller.login'
])

  .controller('masukCtrl', ['$rootScope', '$state', '$localStorage', '$http', '$ionicLoading', '$ionicPopup', 'Config', 'Account', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($rootScope, $state, $localStorage, $http, $ionicLoading, $ionicPopup, Config, Account, $ionicSideMenuDelegate) {

			var vm = this;			
			vm.Signin = Signin;
			vm.showSide = showSide;
			vm.LoginUser = {
			  email: "",
			  password: ""
			};

			if ($localStorage.token) {
			  $state.go('tabsKajian.infoKajian');
			}

			function showSide() {
				$ionicSideMenuDelegate.toggleLeft();
			}

			function Signin(LoginUser) {

			  $ionicLoading.show({
			    template: "<ion-spinner icon=\"dots\" class=\"spinner-positive\"></ion-spinner>"
			  });

				// var postData = "email=" + LoginUser.email + "&password=" + LoginUser.password;
				var postData = {
					email: LoginUser.email,
					password: LoginUser.password,
					appid: 'keKajian',
				};
			  $http({
			    method: "POST",
			    url: Config.ApiUrl + "/login",
			    skipAuthorization: true,
			    headers: {
			      //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			      'Content-Type': 'application/json',
			    },
			    data: postData,
			  }).then(function successCallback(res) {

					console.log('res', res);

			    if (res.status === 201) {
						
						$localStorage.token = res.data.data.token;
						$localStorage.user = {
							'address' : res.data.data.user.address,
							'birthdate' : res.data.data.user.birthdate,
							'birthplace' : res.data.data.user.birthplace,
							'city_id' : res.data.data.user.city_id,
							'community' : res.data.data.user.community,
							'disabled' : res.data.data.user.disabled,
							'email' : res.data.data.user.email,
							'group_id' : res.data.data.user.group_id,
							'group_name' : res.data.data.user.group_name,
							'hp' : res.data.data.user.hp,
							'id' : res.data.data.user.id,
							'jobs' : res.data.data.user.jobs,
							'name' : res.data.data.user.name
						};
						// $localStorage.$save();

						$rootScope.isLogin = true;

						$ionicLoading.hide();
						$state.go('tabsKajian.infoKajian');

			    } else {

			      $ionicLoading.hide();
			      if (!angular.isUndefinedOrNull(res.data.data)) {
			        $ionicPopup.alert({
			          title: 'Gagal masuk ke halaman member',
			          template: res.data.message
			        });
			      }

			    }

			  }, function errorCallback(err) {

					console.log('err', err);

			    $ionicLoading.hide();

			    if (!angular.isUndefinedOrNull(err.data)) {
			      $ionicPopup.alert({
			        title: 'Login Gagal',
			        template: err.data.errors[0].code
			      });
			    }

			  });

			};

    }
  ])