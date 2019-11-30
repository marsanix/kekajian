angular.module('app.factories.info_kajian', [])

  .factory('InfoKajian', InfoKajian);

  InfoKajian.$inject = ['$q', '$http', 'Config'];

  function InfoKajian($q, $http, Config) {

    var frmData = {};

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
        $http.get(Config.ApiUrl + '/kajian', {
          params: data
        }).success(success).error(error);
      },
      lists: function (data, success, error) {
        $http.get(Config.ApiUrl + '/kajian/lists', {
          params: data
        }).success(success).error(error);
      },
      delete: function (id, success, error) {
        $http.delete(Config.ApiUrl + '/kajian/' + id).success(success).error(error);
      },
      removePhoto: function (id, success, error) {
        $http.delete(Config.ApiUrl + '/kajian/removePhoto/' + id).success(success).error(error);
      },
      kota: function (data, success, error) {
        $http.get(Config.ApiUrl + '/kota/lists', {
          params: data
        }).success(success).error(error);
      },
      frmData: frmData
    };

  }


