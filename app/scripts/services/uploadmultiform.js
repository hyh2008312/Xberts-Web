'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.UploadMutiForm
 * @description
 * # UploadMutiForm
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('UploadMultiForm', ['Upload','$q', function (Upload,$q) {
    // Public API here
    //Upload Wrapper,exposed method:upload;exposed property:progress
    return function (url,method, data, successCallBack, errorCallback) {
      var uploadMulti = {
        url: url,
        method:method,
        progress: 0,
        loading: false,
        data: data,
        successCallBack: successCallBack,
        errorCallback: errorCallback,
        //upload: function () {
        //  var delay=$q.defer();
        //  var self = this;
        //  Upload.upload({
        //    url: self.url,
        //    data: self.data
        //  }).then(function(resp){
        //    delay.resolve(resp);
        //  }, function(resp){
        //    delay.reject(resp);
        //  }, function (evt) {
        //    self.progress = parseInt(100.0 * evt.loaded / evt.total);
        //    console.log(self.progress);
        //  });
        //  return delay.promise;
        //}
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
