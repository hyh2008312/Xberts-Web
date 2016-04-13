/**
 * Created by zyd on 16/4/12.
 */
'use strict';

angular.module('xbertsApp')
  .service('UploadService', ['UploadAws', 'FileUtil', 'Asset', function (UploadAws, FileUtil, Asset) {
    var uploadService = this;

    this.uploadFile = function (file, domain, successCallback, errorCallback, processCallback) {
      var type;
      if (FileUtil.isVideo(file)) {
        type = 'VIDEO';
      } else {
        type = 'IMAGE';
      }
      UploadAws.uploadMedia(file, type + '_' + domain)
        .then(function (response) {
          var url = decodeURIComponent(response.headers('Location'));
          if (type === 'VIDEO') {
            Asset.createVideoAsset(url, domain)
              .then(successCallback)
              .catch(errorCallback);
          } else {
            Asset.createImageAsset(url, domain)
              .then(successCallback)
              .catch(errorCallback);
          }
        }, errorCallback, processCallback);
    };
    this.uploadFiles = function (files, domain, successCallbacks, errorCallback, processCallback) {
      for (var i = 0; i < files.length; i++) {
        var type;
        if (FileUtil.isVideo(files[i])) {
          type = 'VIDEO';
        } else {
          type = 'IMAGE';
        }
        uploadService.uploadFile(files[i], domain, successCallbacks[type], errorCallback, processCallback);

      }
    };
  }]);
