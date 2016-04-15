'use strict';

angular.module('xbertsApp')
  .service('UploadAws', ['$resource', '$rootScope', 'Upload', 'Configuration', 'FileUtil',
    function ($resource, $rootScope, Upload, Configuration, FileUtil) {
      this.generatePolicy = function (type, file) {
        var fileExtension = file.name.split('.').pop();

        return $resource(Configuration.apiBaseUrl + '/aws/s3policy/', null, {
          generate: {
            method: 'POST'
          }
        }).generate({
          type: type,
          fileFormat: fileExtension,
          contentType: FileUtil.getContentType(file)
        }).$promise;
      };

      this.upload = function (file, postParams) {
        postParams.file = file;

        var upload = Upload.upload({
          url: Configuration.awsCloudFrontUrl,
          method: 'POST',
          withCredentials: false,
          data: {
            acl: postParams.acl,
            key: postParams.key,
            'Content-Type': FileUtil.getContentType(file),
            policy: postParams.policy,
            'x-amz-algorithm': postParams.algorithm,
            'x-amz-credential': postParams.credential,
            'x-amz-date': postParams.date,
            'x-amz-signature': postParams.signature,
            file: file
          }
        });

        $rootScope.$on('uploadCancel', function (event, canceledFile) {
          if (canceledFile === file) {
            upload.abort();
          }
        });

        return upload;
      };

      this.uploadMedia = function (file, type) {
        var self = this;
        return this.generatePolicy(type, file)
          .then(function (value) {
            value.$promise = undefined;
            return self.upload(file, value);
          });
      };
  }]);
