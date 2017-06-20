'use strict';

angular.module('xbertsApp')
  .controller('EditDealsPostCtrl', ['$rootScope', '$scope','UploadService', 'ShareProductService', '$state',
    'localStorageService','category','$mdDialog',
    function ($rootScope, $scope, UploadService, ShareProductService, $state, localStorageService, category,$mdDialog) {

    $scope.product = {};
    $scope.product.imageGroup = [];
    $scope.product.salePrice = {};
    $scope.product.originalPrice = {};
    $scope.product.category = {};
    $scope.categoryoptions = category;

    $scope.imgLoaded = false;
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
          amount: product.salePrice.amount
        },
        originalPrice: {
          amount: product.originalPrice.amount
        },
        category:product.category
      };

      // post start
      $scope.$emit('backdropOn', 'fetch project');
      ShareProductService.create(_product).then(function () {
        $scope.$emit('backdropOff', 'success');
        var name = 'posts_' + $rootScope.user.getUserId();
        // clear post list
        localStorageService.remove(name + '_currentPage');
        localStorageService.remove(name + '_items');
        localStorageService.remove(name + '_next');
        localStorageService.remove(name + '_count');
        $state.go('application.productDeals');
      }, function () {
        // tips
        $scope.$emit('backdropOff', 'project get error');
        // post end
      });
    };

    $scope.reset = function() {
      $state.go('application.productDeals');
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

  }]);
