(function () {
    'use strict';

    angular.module('app.controller.bagi_kajian.upload_photo', [])

    .controller('uploadPhotoCtrl', ['$scope', '$stateParams', '$cordovaFileTransfer', '$cordovaCamera', 'Config', '$localStorage', 'BagiKajian', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $cordovaFileTransfer, $cordovaCamera, Config, $localStorage, BagiKajian, $state) {

        var vm = this;
        vm.uploadPhoto = uploadPhoto;
        vm.removePhoto = removePhoto;
        vm.addToSlide = addToSlide;
        vm.photo = {};
        vm.ua = navigator.userAgent;       

        ionic.Platform.ready(function () {
            // will execute when device is ready, or immediately if the device is already ready.
            vm.ua = ionic.Platform.ua;

        });

        function uploadPhoto() {

            document.addEventListener('deviceready', function () {

                console.log('navigator.camera', navigator.camera);

                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    
                    vm.imageBase64 = "data:image/jpeg;base64," + imageData;

                    var image = document.getElementById('tempImage');
                    image.src = vm.imageBase64;
                    
                    var server = Config.ApiUrl + "/kajian/uploadPhoto";
                    var filePath = vm.imageBase64;

                    // var date = new Date();

                    // var options = {
                    //   fileKey: "image_file",
                    //   fileName: imageData.substr(imageData.lastIndexOf('/') + 1),
                    //   chunkedMode: false,
                    //   mimeType: "image/jpg"
                    // };

                    var params = {}; //new Object();
                    params.headers = {
                        Authorization: 'Bearer ' + $localStorage.token,
                        'user-agent': vm.ua
                    };
                    var options         = new FileUploadOptions();
                    options.fileKey     = "image_file";
                    options.fileName    = "image.jpeg"; // imageData.substr(imageData.lastIndexOf('/') + 1);
                    options.chunkedMode = false;
                    options.mimeType    = "image/jpeg";
                    options.params      = params;
                    options.headers     = params.headers;
                    options.httpMethod  = 'post';

                    //document.addEventListener('deviceready', function () {
                    $cordovaFileTransfer.upload(server, filePath, options).then(function (result) {
                        console.log("SUCCESS: ",  JSON.parse(result.response));
                        var jsonParse = JSON.parse(result.response);
                        vm.photo = jsonParse.file;
                    }, function (err) {
                        console.log("ERROR: " + JSON.stringify(err));
                    }, function (progress) {
                        console.log("PROGRESS: " + JSON.stringify(progress));
                        // constant progress updates
                    });
                    //}, false);

                    // $cordovaFileTransfer.upload(server, filePath, options).then(function (result) {
                    //   console.log("SUCCESS: " + JSON.stringify(result.response));
                    //   console.log('Result_' + result.response[0] + '_ending');
                    //   alert("success");
                    //   alert(JSON.stringify(result.response));

                    // }, function (err) {
                    //   console.log("ERROR: " + JSON.stringify(err));
                    //   //alert(JSON.stringify(err));
                    // }, function (progress) {
                    //   // constant progress updates
                    // });


                }, function (err) {
                    // error
                    console.log(err);
                });

            }, false);
        }

        function removePhoto() {
            vm.imageBase64 = "";
            var image = document.getElementById('tempImage');
            image.src = vm.imageBase64;
        }

        function addToSlide() {
            console.log('vm.photo', vm.photo);
            var cover = false;
            if (typeof (BagiKajian.frmAdd.photos) == 'undefined') {
              BagiKajian.frmAdd.photos = [];
              cover = true;
            }

            // if (typeof (BagiKajian.frmAdd.photos) == 'undefined') {
            //     BagiKajian.frmAdd.photos = [];
            //     BagiKajian.frmAdd.photos.push({
            //       photo: vm.photo.url,
            //       cover: true,
            //     });
            // } else {

            BagiKajian.frmAdd.photos.push({
                photo: vm.photo.url,
                cover: cover,
            });
            
            // }
            $state.go('bagiKajian');
        }

        // function uploadPhoto() {

        //     var params = {}; //new Object();
        //     params.headers = {
        //       Authorization: 'Bearer ' + $localStorage.token,
        //       'user-agent': vm.ua
        //     };           
        //     var options = new FileUploadOptions();          
        //     options.fileKey = "image_file";
        //     options.fileName = "image.png";
        //     options.chunkedMode = false;
        //     options.mimeType = "image/png";
        //     options.params = params;
        //     options.headers = params.headers;
        //     options.httpMethod = 'post';
          
        //   console.log('options', options);

        //     var path = cordova.file.applicationDirectory + 'www/';

        //   document.addEventListener('deviceready', function () {
        //     $cordovaFileTransfer.upload(Config.ApiUrl + "/kajian/uploadPhoto", path + "img/logo.png", options).then(function (result) {
        //         console.log("SUCCESS: " + JSON.stringify(result));
        //     }, function (err) {
        //         console.log("ERROR: " + JSON.stringify(err));
        //     }, function (progress) {
        //         console.log("PROGRESS: " + JSON.stringify(progress));
        //         // constant progress updates
        //     });
        //   }, false);

        // }

         //document.addEventListener('deviceready', function () {

        //    $cordovaFileTransfer.upload(server, filePath, options)
        //      .then(function (result) {
        //        // Success!
        //      }, function (err) {
        //        // Error
        //      }, function (progress) {
        //        // constant progress updates
        //      });

         //}, false);

    }
    ])

})();