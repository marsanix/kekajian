(function () {
  'use strict';

  angular.module('app.controller.bagi_kajian.edit_kota', [])

  .controller('pilihKota2Ctrl', ['$scope', '$stateParams', 'BagiKajian', '$state', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, BagiKajian, $state, $timeout) {

		var vm = this;
		vm.searchKeyword = '';
		vm.searchKota = searchKota;
		vm.selectKota = selectKota; 
		vm.kotaLists = [];
      	// vm.kotaLists = [
		// 	{id: 1, nama: 'Bandung'},
		// 	{id: 2, nama: 'Jakarta'},
		// 	{id: 3, nama: 'Batam'},
		//   ];

		  loadKota();

		  var promiseSearch = '';
		  function searchKota() {
		    if (promiseSearch) {
		      $timeout.cancel(promiseSearch);
		    }
		    promiseSearch = $timeout(function () {
		      loadKota();
		    }, 200);
		  }

		  function loadKota() {
		    BagiKajian.kota({search: vm.searchKeyword}, function (res) {
		      vm.kotaLists = res.kotas;
		    }, function (e) {
		      if (e && e.status_code === 401) {
		        Account.reloadToken();
		      }
		    });
		  }
		  
		function selectKota(ev, item) {
			BagiKajian.selectedKota = item;
			$state.go("bagiKajianEdit");
		}


    }
  ])

})();