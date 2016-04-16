'use strict';

angular.module('xbertsApp')
  .service('UploadService', ['$q', '$rootScope', 'UploadAws', 'FileUtil', 'Asset', 'ProgressBarModal',
    function ($q, $rootScope, UploadAws, FileUtil, Asset, ProgressBarModal) {
      this.uploadFile = function (file, domain, scope) {
        scope.progress = 0;
        var progressModel = ProgressBarModal.open({
          scope: scope
        }, file.name);

        var type;
        if (FileUtil.isVideo(file)) {
          type = 'VIDEO';
        } else {
          type = 'IMAGE';
        }

        var uploadPromise = UploadAws.uploadMedia(file, type + '_' + domain)
          .then(function (response) {
            var url = decodeURIComponent(response.headers('Location'));
            if (type === 'VIDEO') {
              return Asset.createVideoAsset(url, domain);
            } else {
              return Asset.createImageAsset(url, domain);
            }
          }, null, function (evt) {
            scope.progress = parseInt(100.0 * evt.loaded / evt.total);
          })
          .then(function (data) {
            progressModel.close();
            return $q.resolve({type: type, data: data});
          })
          .catch(function (error) {
            progressModel.close();
            return $q.reject(error);
          });

        progressModel.result.catch(function () {
          $rootScope.$emit('uploadCancel', file);
        });

        return uploadPromise;
      };
  }]);
