(function () {
    'use strict';

    angular.module('app.controller.daftar', [])

    .controller('daftarCtrl', ['$scope', '$stateParams', 'Account', '$ionicLoading', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, Account, $ionicLoading, $ionicPopup, $state) {

            var vm = this;
            vm.frmDaftar = {};
            vm.submitDaftar = submitDaftar;

            function submitDaftar(frmDaftar) {

                if ((typeof (frmDaftar.name) == 'undefined') ||
                    (typeof (frmDaftar.email) == 'undefined') ||
                    (typeof (frmDaftar.password) == 'undefined')                    
                ) {                    
                    $ionicPopup.alert({
                      title: 'Pendaftaran Gagal',
                      template: 'Mohon lengkapi nama, email, dan password'
                    });                    
                    return false;
                }

                $ionicLoading.show({
                  template: "<ion-spinner icon=\"dots\" class=\"spinner-positive\"></ion-spinner>"
                });

                var datas = {
                    name: frmDaftar.name,
                    email: frmDaftar.email,
                    password: frmDaftar.password,
                    password_confirmation: frmDaftar.password,
                };
                Account.save(datas, function(res, status_code) {
                    console.log('res', res);

                    if (status_code === 201) {

                        $ionicPopup.alert({
                          title: 'Pendaftaran Berhasil',
                          template: 'Terima kasih telah melakukan mendaftaran, silahkan lakukan aktivasi melalui link yang telah dikirim ke email Anda.'
                        });

                        // $localStorage.token = res.data.data.token;
                        // $localStorage.user = {
                        //     'address':    res.data.data.user.address,
                        //     'birthdate':  res.data.data.user.birthdate,
                        //     'birthplace': res.data.data.user.birthplace,
                        //     'city_id':    res.data.data.user.city_id,
                        //     'community':  res.data.data.user.community,
                        //     'disabled':   res.data.data.user.disabled,
                        //     'email':      res.data.data.user.email,
                        //     'group_id':   res.data.data.user.group_id,
                        //     'group_name': res.data.data.user.group_name,
                        //     'hp':         res.data.data.user.hp,
                        //     'id':         res.data.data.user.id,
                        //     'jobs':       res.data.data.user.jobs,
                        //     'name':       res.data.data.user.name
                        // };

                        // $rootScope.isLogin = true;
                        vm.frmDaftar = {};
                        $ionicLoading.hide();
                        
                        $state.go('masuk');
                    }
                    
                    vm.frmDaftar = {};
                    $ionicLoading.hide();

                }, function(err) {
                    if (err && err.status_code == 422) {
                        var errorContents = '';
                        var getFields = ['name', 'email', 'password'];
                        err.errors.find(function(val) {
                            if (getFields.includes(val.field)) {
                                errorContents += val.code + '<br />';
                            }                            
                        });
                        $ionicPopup.alert({
                          title: 'Pendaftaran Gagal',
                          template: errorContents
                        });
                    }
                    $ionicLoading.hide();
                });                
            }

        }
    ])


})();