'use strict';

angular.module('xbertsApp')
  .factory('UploadMultiForm', ['Upload', function (Upload) {
    //Upload Wrapper,exposed method:upload;exposed property:progress
    return function (url, method, data, successCallBack, errorCallback) {
      var uploadMulti = {
        url: url,
        method:method,
        progress: 0,
        loading: false,
        data: data,
        successCallBack: successCallBack,
        errorCallback: errorCallback,
        upload: function () {
          var self = this;
          Upload.upload({
            url: self.url,
            data: self.data,
            method: self.method
          }).then(self.successCallBack, self.errorCallback, function (evt) {
            self.progress = parseInt(100.0 * evt.loaded / evt.total);
            console.log(self.progress);
          });
        }
      };
      return uploadMulti;
    };
  }]);
