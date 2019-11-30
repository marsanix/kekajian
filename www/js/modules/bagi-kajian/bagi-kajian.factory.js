angular.module('app.factories.bagi_kajian', [])

  .factory('BagiKajian', BagiKajian);

  BagiKajian.$inject = ['$q', '$http', 'Config'];

  function BagiKajian($q, $http, Config) {

    var frmData = {};
    var frmAdd = {};
    var frmEdit = {};
    var selectedKota = '';
    var searchKeyword = '';

    return {
      add: function (data, success, error) {
        $http.post(Config.ApiUrl + '/kajian', data).success(success).error(error);
      },
      edit: function (data, success, error) {
        $http.put(Config.ApiUrl + '/kajian/' + data.id, data).success(success).error(error);
      },
      get: function (id, success, error) {
        $http.get(Config.ApiUrl + '/kajian/get/' + id).success(success).error(error);
      },
      search: function (data, success, error) {
        $http.get(Config.ApiUrl + '/kajian_saya', {
          params: data
        }).success(success).error(error);
      },    
      delete: function (id, success, error) {
        $http.delete(Config.ApiUrl + '/kajian/' + id).success(success).error(error);
      },
      uploadPhoto: function (daga, success, error) {
        $http.delete(Config.ApiUrl + '/kajian/uploadPhoto/', data).success(success).error(error);
      },
      removePhoto: function (id, success, error) {
        $http.delete(Config.ApiUrl + '/kajian/removePhoto/' + id).success(success).error(error);
      },
      kota: function (data, success, error) {
        $http.get(Config.ApiUrl + '/kota/lists', {
          params: data
        }).success(success).error(error);
      },
      frmData: frmData,
      frmAdd: frmAdd,
      frmEdit: frmEdit,
      selectedKota: selectedKota,
      searchKeyword: searchKeyword,
    };

  }


