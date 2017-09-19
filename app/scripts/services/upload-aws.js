'use strict';

angular.module('xbertsApp')
  .service('UploadAws', ['$resource', '$rootScope', 'Upload', 'API_BASE_URL','$mdDialog','$q',
    function ($resource, $rootScope, Upload, API_BASE_URL,$mdDialog,$q) {
      this.generatePolicy = function (type, file) {
        return $resource(API_BASE_URL + '/aws/s3policy/', null, {
          generate: {
            method: 'POST'
          }
        }).generate({
          type: type,
          fileName: file.name
        }).$promise;
      };

      this.upload = function (file, postParams) {
        postParams.file = file;

        var upload = Upload.upload({
          url: postParams.url,
          method: 'POST',
          withCredentials: false,
          data: {
            acl: postParams.acl,
            key: postParams.key,
            'Content-Type': postParams['Content-Type'],
            policy: postParams.policy,
            'x-amz-algorithm': postParams['x-amz-algorithm'],
            'x-amz-credential': postParams['x-amz-credential'],
            'x-amz-date': postParams['x-amz-date'],
            'x-amz-signature': postParams['x-amz-signature'],
            file: file
          }
        });

        $rootScope.$on('uploadCancel', function (event, canceledFile) {
          if (canceledFile === file) {
            upload.abort();
          } else {
            upload.pause();
          }
        });

        return upload;
      };

      this.uploadMedia = function (file, type) {
        var self = this;
        if(file.type != 'image/jpg' && file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/gif') {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(angular.element(document.body)))
              .clickOutsideToClose(true)
              .disableParentScroll(true)
              .textContent("Please check the picture format. It only supports JPEG, PNG or GIF format.")
              .ariaLabel('Alert Dialog')
              .ok('Ok')
          );
          return $q.reject({status: -1});
        }
        if(file.size > 4194304) {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(angular.element(document.body)))
              .clickOutsideToClose(true)
              .disableParentScroll(true)
              .textContent("Please check the file size. The maximum file size is 4MB.")
              .ariaLabel('Alert Dialog')
              .ok('Ok')
          );
          return $q.reject({status: -1});
        }
        return this.generatePolicy(type, file)
          .then(function (value) {
            value.$promise = undefined;
            return self.upload(file, value);
          });
      };
  }]);
