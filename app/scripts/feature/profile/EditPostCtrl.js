'use strict';

angular.module('xbertsApp')
  .controller('EditPostCtrl', ['$rootScope', '$scope', 'editPost','UploadService', 'ShareProductService', '$state', 'localStorageService',
    function ($rootScope, $scope, editPost, UploadService, ShareProductService, $state, localStorageService) {

    $scope.product = editPost;
    var oldPost = angular.copy(editPost, {});
    $scope.imgLoaded = $scope.product.imageGroup.length>0?true:false;
    $scope.showMask = false;
    $scope.onShowMask = function() {
      $scope.showMask = !$scope.showMask;
    };

    $scope.offDeleteImage = function() {
      $scope.showMask = false;
      $scope.imgLoaded = false;
      $scope.product.imageGroup = [];
    };

    var coverSuccessCallback = function (data) {
      $scope.showMask = false;
      $scope.imgLoaded = true;
      $scope.product.imageGroup.push({
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
    $scope.coverUpload = function ($file) {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      if ($file) {
        UploadService.uploadFile($file, 'SHARE_PRODUCT', $scope)
          .then(coverSuccessCallback, errorCallback);
      }
    };

    $scope.submitForm = function(product){
      if(!$rootScope.user.authRequired()) {
        return;
      }
      if (!$scope.productForm.$valid) {
        return;
      }

      var _product = {
        id: product.id,
        title: product.title,
        description: product.description,
        purchaseUrl: product.purchaseUrl,
        imageGroup: product.imageGroup,
        videoUrl: product.videoUrl
      };

      // post start
      $scope.$emit('backdropOn', 'fetch project');
      ShareProductService.update(_product).then(function () {
        $scope.$emit('backdropOff', 'success');
        var name = 'posts_' + $rootScope.user.getUserId();
        // clear post list
        localStorageService.remove(name + '_currentPage');
        localStorageService.remove(name + '_items');
        localStorageService.remove(name + '_next');
        localStorageService.remove(name + '_count');
        $state.go('application.expert', {
          tab:'posts',
          expertId: $rootScope.user.getUserId()
        },{
          reload:true
        });
      }, function () {
        // tips
        $scope.$emit('backdropOff', 'project get error');
        // post end
      });
    };

    $scope.reset = function() {
      $scope.product = angular.copy(oldPost,{});
      $scope.showMask = false;
      $scope.imgLoaded = $scope.product.imageGroup.length>0?true:false;
      $scope.file = $scope.product.imageGroup.length>0?$scope.product.imageGroup[0].imageUrls.original: false;
    };

  }]);