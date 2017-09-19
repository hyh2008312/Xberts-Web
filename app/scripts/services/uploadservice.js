'use strict';

angular.module('xbertsApp')
  .service('UploadService', ['$q', '$rootScope', 'UploadAws', 'FileUtil', 'Asset', 'ProgressBarModal','$mdDialog',
    'SystemConstant','systemImageSizeService',
    function ($q, $rootScope, UploadAws, FileUtil, Asset, ProgressBarModal, $mdDialog, SystemConstant, systemImageSizeService) {
      this.uploadFile = function (file, domain, scope) {

        scope.progress = 0;
        var progressModel = ProgressBarModal;

        var type;
        if (FileUtil.isVideo(file)) {
          type = 'VIDEO';
        } else {
          type = 'IMAGE';
        }

        var uploadPromise = UploadAws.uploadMedia(file, type + '_' + domain)
          .then(function (response) {
            var url = decodeURIComponent(response.headers('Location'));

            if(SystemConstant.IMAGE_UPLOAD_TYPE[domain]) {
              return systemImageSizeService.setImageUrl(url,domain);
            }

            if (type === 'VIDEO') {
              return Asset.createVideoAsset(url, domain);
            } else {
              return Asset.createImageAsset(url, domain);
            }
          }, function(error) {
            if(error.status == -1) {
              progressModel.close();
              return $q.reject(error);
            }
          }, function (evt) {
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


        progressModel.open({
          scope: scope
        }, file.name).catch(function() {
          $rootScope.$emit('uploadCancel', file);
        });

        return uploadPromise;
      };
  }]);
