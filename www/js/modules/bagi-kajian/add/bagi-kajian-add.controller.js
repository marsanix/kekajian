(function () {
  'use strict';

  angular.module('app.controller.bagi_kajian.add', ['app.controller.bagi_kajian.add_kota'])

  .controller('bagiKajianCtrl', ['$scope', '$stateParams', 'BagiKajian', 'Account', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, BagiKajian, Account, $state) {
      	var vm       	  = this;
		vm.frmAdd         = BagiKajian.frmAdd;		
		vm.selectedKota   = BagiKajian.selectedKota;
		vm.frmSubmit      = frmSubmit;
		vm.setCoverPhoto  = setCoverPhoto;
		vm.removePhoto    =  removePhoto;

		console.log('vm.frmAdd', vm.frmAdd);

		if (vm.selectedKota) {
			vm.frmAdd.kota_id = vm.selectedKota.id;
		}

		function frmSubmit(frmAdd) {
		  vm.isSubmitting = true;
		  // frmAdd.photos = vm.photoList;
		  frmAdd.tanggal = moment(frmAdd.tanggal).format('YYYY-MM-DD');
		  BagiKajian.add(frmAdd, function (res, header) {

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
				
				$state.go('daftarBagiKajian');

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

		function setCoverPhoto(ev, idx, photo) {
			for (var i = 0; i <= (vm.frmAdd.photos.length - 1); i++) {
				vm.frmAdd.photos[i].cover = 0;				
			}
			photo.cover = 1;
		}

		function removePhoto(ev, idx, photo) {
			vm.frmAdd.photos.splice(idx, 1);
		}


    }
  ]);

})();