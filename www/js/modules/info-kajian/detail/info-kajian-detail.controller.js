
angular.module('app.controller.info_kajian.detail', [])

.controller('detailKajianCtrl', ['$scope', '$stateParams', 'InfoKajian', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $stateParams, InfoKajian) {

    var vm = this;
    vm.id = $stateParams.id;
    vm.data = {};
   
    loadData(vm.id)

    function loadData(id) {
      InfoKajian.get(id, function (res) {
        vm.data = res.data;      

        console.log(res);

      }, function (e) {
        if (e && e.status_code === 401) {
          Account.reloadToken();
        }
      });
    }

  }
]);