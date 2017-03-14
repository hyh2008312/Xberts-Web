angular.module('xbertsApp')
  .directive('shareProductPost',['$rootScope','UploadService',function ($rootScope,UploadService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/feature/discover/shareProductPost/share-product-Post.html',
      link: function (scope, element, attrs, ctrls) {
        scope.photoPopup = false;
        scope.videoPopup = false;
        scope.showMask = false;
        scope.imgLoaded = false;
        scope.onPhotoPopup = function() {
          scope.videoPopup = false;
          if(!scope.photoPopup) {
            scope.photoPopup = true;
          } else {
            scope.photoPopup = false;
          }
        };
        scope.offPhotoPopup = function() {
          scope.photoPopup = false;
        };
        scope.onVideoPopup = function() {
          scope.photoPopup = false;
          if(!scope.videoPopup) {
            scope.videoPopup = true;
          } else {
            scope.videoPopup = false;
          }
        };
        scope.offVideoPopup = function() {
          scope.videoPopup = false;
        };
        scope.onShowMask = function() {
          scope.showMask = true;
        };
        scope.offShowMask = function() {
          scope.showMask = false;
        };
        scope.offDeleteImage = function() {
          scope.showMask = false;
          scope.imgLoaded = false;
        };
        var coverSuccessCallback = function (data) {
          console.log(data.data);
          scope.imgLoaded = true;
        };
        var errorCallback = function (error) {
          // Don't display error when user cancels upload
          if (error.status === -1) {
            return;
          }
        };
        scope.coverUpload = function ($file) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          if ($file) {
            UploadService.uploadFile($file, 'SHARE_PRODUCT', scope)
              .then(coverSuccessCallback, errorCallback);
          }
        };

      }
    }
  }]);
