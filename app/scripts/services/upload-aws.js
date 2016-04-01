'use strict';

angular.module('xbertsApp')
  .service('UploadAws', ['$resource', 'Upload', 'Configuration', function($resource, Upload, Configuration) {
    function getContentType(file) {
      return file.type != '' ? file.type : 'binary/octet-stream';
    }

    this.generatePolicy = function(type, file) {
      var fileExtension = file.name.split('.').pop();

      return $resource(Configuration.apiBaseUrl + '/aws/s3policy/', null, {
        generate: {
          method: 'POST'
        }
      }).generate({
        type: type,
        fileFormat: fileExtension,
        contentType: getContentType(file)
      }).$promise;
    };

    this.upload = function(file, postParams) {
      postParams.file = file;

      return Upload.upload({
        url: Configuration.awsCloudFrontUrl,
        method: 'POST',
        withCredentials: false,
        data: {
          acl: postParams.acl,
          key: postParams.key,
          'Content-Type': getContentType(file),
          policy: postParams.policy,
          'x-amz-algorithm': postParams.algorithm,
          'x-amz-credential': postParams.credential,
          'x-amz-date': postParams.date,
          'x-amz-signature': postParams.signature,
          file: file
        }
      });
    };

    this.uploadImage = function(file, type) {
      var self = this;
      return this.generatePolicy(type, file)
        .then(function(value) {
          value.$promise = undefined;
          return self.upload(file, value);
        });
    };
  }]);
