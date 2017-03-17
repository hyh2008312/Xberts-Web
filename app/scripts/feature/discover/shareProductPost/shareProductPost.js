angular.module('xbertsApp')
  .directive('shareProductPost',['ShareProductService','$rootScope','UploadService',function(ShareProductService,$rootScope,UploadService) {
    return {
      restrict: 'E',
      scope: {
        onProductPost: '&'
      },
      templateUrl: 'scripts/feature/discover/shareProductPost/share-product-post.html',
      link: function (scope, element, attrs, ctrls) {
        scope.product = {
          imageGroup:[]
        };
        scope.formToggle = true;
        scope.photoPopup = false;
        scope.videoPopup = false;
        scope.showMask = false;
        scope.imgLoaded = false;
        scope.onPhotoPopup = function() {
          scope.videoPopup = false;
          scope.photoPopup = !scope.photoPopup;
        };
        scope.onVideoPopup = function() {
          scope.photoPopup = false;
          scope.videoPopup = !scope.videoPopup;
        };
        scope.onShowMask = function() {
          scope.showMask = !scope.showMask;
        };
        scope.offDeleteImage = function() {
          scope.showMask = false;
          scope.imgLoaded = false;
          scope.product.imageGroup = [];
        };
        var coverSuccessCallback = function (data) {
          scope.imgLoaded = true;
          scope.product.imageGroup.push({
            index: 0,
            image: data.data.id
          })
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

        scope.submitForm = function(product){
          if(!$rootScope.user.authRequired()) {
            return;
          }
          // post start
          scope.$emit('backdropOn', 'fetch project');
          ShareProductService.create(product).then(function (newProduct) {
            // 清空form
            scope.product = {
              imageGroup : []
            };
            scope.formToggle = !scope.formToggle;
            scope.offDeleteImage();
            scope.$emit('backdropOff', 'project get completed');
            // 讲 product 加入 list
            scope.onProductPost(newProduct);
            // post end
          }, function () {
            // tips
            scope.$emit('backdropOff', 'project get error');
            // post end
          });
        }
      }
    }
  }]);
