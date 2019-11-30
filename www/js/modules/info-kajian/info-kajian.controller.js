angular.module('app.controller.info_kajian', [
	'app.controller.info_kajian.detail'
])

  .controller('infoKajianCtrl', ['$q', '$scope', '$stateParams' , 'InfoKajian', 'Account', '$ionicScrollDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($q, $scope, $stateParams, InfoKajian, Account, $ionicScrollDelegate) {

		var vm = this;
		vm.listData = [];
		vm.frmSearch = {};
		vm.frmSearch.currentPage = 1;
		vm.frmSearch.pageSize = 10;
		vm.frmSearch.total = 0;
		vm.frmSearch.total_pages = 0;
		vm.showPageAction = true;
		vm.isLoading = false;
		vm.pagingAction = pagingAction;

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

		function loadData() {
			var defer = $q.defer();
			vm.isLoading = true;
		  var searchData = {
		    perpage: vm.frmSearch.pageSize,
		    search: vm.frmSearch.keyword,
		    page: vm.frmSearch.currentPage,
		  };
		  InfoKajian.search(searchData, function (res) {
				// res.data.find(function(val) {
				// 	vm.listData.push(val);
				// });		    
				for (var i = 0; i <= (res.data.length - 1); i++) {
				  vm.listData.push(res.data[i]);				  
				}

		    vm.frmSearch.currentPage = res.meta.pagination.current_page;
		    vm.frmSearch.pageSize = res.meta.pagination.per_page;
		    vm.frmSearch.total = res.meta.pagination.total;
				vm.frmSearch.total_pages = res.meta.pagination.total_pages;
				
				if (vm.frmSearch.currentPage >= vm.frmSearch.total_pages) {
				  vm.showPageAction = false;
				}

				// $ionicScrollDelegate.scrollBottom();
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

