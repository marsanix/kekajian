angular.module('app.controller.bagi_kajian', [
	'app.controller.bagi_kajian.add',
	'app.controller.bagi_kajian.edit',
	'app.controller.bagi_kajian.upload_photo'
])

  .controller('daftarBagiKajianCtrl', ['$q', '$scope', '$stateParams', 'BagiKajian', 'Account', '$timeout', '$ionicScrollDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($q, $scope, $stateParams, BagiKajian, Account, $timeout, $ionicScrollDelegate) {

		var vm                   = this;
		vm.listData              = [];
		vm.frmSearch             = {};
		vm.frmSearch.keyword     = BagiKajian.searchKeyword;
		vm.frmSearch.currentPage = 1;
		vm.frmSearch.pageSize    = 10;
		vm.frmSearch.total       = 0;
		vm.frmSearch.total_pages = 0;
		vm.showPageAction        = true;
		vm.isLoading             = false;
		vm.searchData            = searchData;
		vm.pagingAction          = pagingAction;

		loadData();

		function pagingAction(act, page, pageSize, total) {
		  if (vm.frmSearch.currentPage < vm.frmSearch.total_pages) {
		    vm.frmSearch.currentPage = page + 1;
				loadData().then(function() {
					$ionicScrollDelegate.scrollBottom();
				});				
		  } else {
		    vm.showPageAction = false;
		  }
		}

		var promiseSearch = '';
		function searchData() {			
			BagiKajian.searchKeyword = vm.frmSearch.keyword;
		  if (promiseSearch) {				
		    $timeout.cancel(promiseSearch);
		  }
		  promiseSearch = $timeout(function () {		
				vm.listData              = [];
				vm.frmSearch.currentPage = 1;
				vm.frmSearch.pageSize    = 10;
		    loadData().then(function() {
					// $ionicScrollDelegate.scrollBottom();
				});
		  }, 1000);
		}

		function loadData() {
			var defer = $q.defer();
			vm.isLoading = true;
		  var searchData = {
		    perpage: vm.frmSearch.pageSize,
		    search: vm.frmSearch.keyword,
		    page: vm.frmSearch.currentPage,
		  };
		  BagiKajian.search(searchData, function (res) {				
				// res.data.find(function (val) {
				// 	if (!vm.listData.includes(val)) {
				// 		vm.listData.push(val);
				// 	}								  
				// });

				for (var i = 0; i <= (res.data.length - 1); i++) {
					// if (!vm.listData.includes(res.data[i])) {
					//   vm.listData.push(res.data[i]);
					// }
					if (vm.listData.indexOf(res.data[i]) === -1) {
					  vm.listData.push(res.data[i]);
					}
				}

		    vm.frmSearch.currentPage 	= res.meta.pagination.current_page;
		    vm.frmSearch.pageSize    	= res.meta.pagination.per_page;
				vm.frmSearch.total        = res.meta.pagination.total;
				vm.frmSearch.total_pages  = res.meta.pagination.total_pages;

				if (vm.frmSearch.currentPage >= vm.frmSearch.total_pages) {
				  vm.showPageAction = false;
				} else {
					vm.showPageAction = true;
				}
				
				vm.isLoading = false;

				defer.resolve(res);

		  }, function (e) {
		    if (e && e.status_code === 401) {
		      Account.reloadToken();
				}
				defer.reject(false);
			});
			return defer.promise;
		}

    }
  ])

