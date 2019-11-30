(function () {
  'use strict';

  angular.module('app.controller.bagi_kajian.edit', ['app.controller.bagi_kajian.edit_kota'])

    .controller('bagiKajianEditCtrl', ['$scope', '$stateParams', 'BagiKajian', 'Account', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
      // You can include any angular dependencies as parameters for this function
      // TIP: Access Route Parameters for your page via $stateParams.parameterName
      function ($scope, $stateParams, BagiKajian, Account) {
        var vm = this;
        vm.id = $stateParams.id;
        vm.frmEdit = BagiKajian.frmEdit;        
        vm.selectedKota = BagiKajian.selectedKota;
        vm.frmSubmit = frmSubmit;

        console.log('vm.id', vm.id);
        console.log('BagiKajian.frmEdit', BagiKajian.frmEdit);

        if (BagiKajian.frmEdit.id != vm.id) {
            console.log('get data');
            getData();
        }

        if (vm.selectedKota) {
          vm.frmEdit.kota_id = vm.selectedKota.id;
        }

        function getData() {
          BagiKajian.get(vm.id, function (res) {
            
            console.log('res', res);
            res.data.tanggal = new Date(res.data.tanggal);
            BagiKajian.frmEdit = res.data;
            vm.frmEdit = BagiKajian.frmEdit;

          }, function (e) {
            if (e && e.status_code === 401) {
              Account.reloadToken();
            }
          });
        }

        function frmSubmit(frmEdit) {
          vm.isSubmitting = true;
          frmEdit.photos = vm.photoList;
          frmEdit.tanggal = moment(frmEdit.tanggal).format('YYYY-MM-DD');
          BagiKajian.edit(frmEdit, function (res, header) {

            console.log('res', res);
            console.log('header', header);

            // ngDialog.close();
            //swal("Success!", 'Kajian baru berhasil di simpan', "success");
            // toastr.success('Kajian baru berhasil di simpan', 'Success!', {
            //   "autoDismiss": false,
            //   "positionClass": "toast-top-right",
            //   "type": "success",
            //   "timeOut": "5000",
            //   "extendedTimeOut": "2000",
            //   "allowHtml": false,
            //   "closeButton": false,
            //   "tapToDismiss": true,
            //   "progressBar": true,
            //   "newestOnTop": true,
            //   "maxOpened": 0,
            //   "preventDuplicates": false,
            //   "preventOpenDuplicates": false
            // });
            vm.isSubmitting = false;
          }, function (e) {
            if (e && e.status_code === 401) {
              Account.reloadToken();
            }
            if (e && e.status_code === 422) {
              vm.errorMessage = '';
              for (var ei = 0; ei <= (e.errors.length - 1); ei++) {
                vm.errorMessage += e.errors[ei].code + '<br />';
              }
              // $window.scrollTo(0, 0);
              Account.reloadToken();
            }

            vm.isSubmitting = false;
          });
        }


      }
    ]);

})();