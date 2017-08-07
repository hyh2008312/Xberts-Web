'use strict';

angular.module('xbertsApp')
  .controller('EditPostCtrl', ['$rootScope', '$scope', 'editPost','UploadService', 'ShareProductService', '$state',
    'localStorageService','category','$mdMedia','$mdDialog','SystemConstant',
    function ($rootScope, $scope, editPost, UploadService, ShareProductService, $state, localStorageService,
              category,$mdMedia,$mdDialog,SystemConstant) {

    $scope.product = editPost;
    $scope.disabled = false;
    $scope.categoryoptions = category;
    $scope.currency = SystemConstant.CURRENCY;

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
        videoUrl: product.videoUrl,
        salePrice: {
          currency: product.salePrice.currency,
          amount: product.salePrice.amount
        },
        originalPrice: {
          currency: product.salePrice.currency,
          amount: product.originalPrice.amount
        },
        category: product.category
      };

      // post start
      $scope.$emit('backdropOn', 'fetch project');
      $scope.disabled = true;
      ShareProductService.update(_product).then(function () {
        $scope.$emit('backdropOff', 'success');
        var name = 'posts_' + $rootScope.user.getUserId();
        // clear post list
        localStorageService.remove(name + '_currentPage');
        localStorageService.remove(name + '_items');
        localStorageService.remove(name + '_next');
        localStorageService.remove(name + '_count');
        if($mdMedia('xs')) {
          $state.go('application.protected.posts', {
            expertId: $rootScope.user.getUserId()
          },{
            reload:true
          });
        } else {
          $state.go('application.expert', {
            tab:'deals',
            expertId: $rootScope.user.getUserId()
          },{
            reload:true
          });
        }
        $scope.disabled = false;
      }, function () {
        // tips
        $scope.$emit('backdropOff', 'project get error');
        $scope.disabled = false;
        // post end
      });
    };

    $scope.reset = function() {
      if($mdMedia('xs')) {
        $state.go('application.protected.posts', {
          expertId: $rootScope.user.getUserId()
        },{
          reload:true
        });
      } else {
        $state.go('application.expert', {
          tab:'deals',
          expertId: $rootScope.user.getUserId()
        },{
          reload:true
        });
      }
    };

    $scope.helpTips = function(ev) {
      $mdDialog.show({
        controller: function(scope, $mdDialog) {
          scope.cancel = function() {
            $mdDialog.cancel();
          };
        },
        templateUrl: 'scripts/feature/profile/myPostList/myPostTips.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        disableParenScroll: true
      });
    };

    var title = 'Share a deal';
    var description = 'Help others save big by finding the best deals and the lowest price!';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
