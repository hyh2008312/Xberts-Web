'use strict';

angular.module('xbertsApp')
  .controller('EditReportCtrl', ['$rootScope', '$scope','UploadService', 'ShareProductService', '$state',
    'localStorageService','$mdMedia','$mdDialog',
    function ($rootScope, $scope, UploadService, ShareProductService, $state, localStorageService,$mdMedia,$mdDialog) {

    $scope.blog = {};
    $scope.disabled = false;

    $scope.imgLoaded = false;
    $scope.showMask = false;

    $scope.previousRange = null;

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
        UploadService.uploadFile($file, 'REVIEW_REPORT_DETAILS', $scope)
          .then(coverSuccessCallback, errorCallback);
      }
    };



    var getCurrentRange = function () {
      var sel;
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          return sel.getRangeAt(0);
        }
      } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
      }
      return null;
    };

    var setCurrentRange = function (range) {
      var sel;
      if (range) {
        if (window.getSelection) {
          sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (document.selection && range.select) {
          //document.select is a legacy problem.
          range.select();
        }
      }
    };

    $scope.setPreviousRange = function (evt) {
      $scope.previousRange = getCurrentRange();
    };

    $scope.onFocus = function (evt) {
      evt.target.addEventListener('mouseup', $scope.setPreviousRange);
    };

    $scope.paste = function (e) {
      var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');

      e.preventDefault();
      $scope.setPreviousRange();

      var paragraphs = bufferText.split('\n');
      for (var i = 0; i < paragraphs.length; i++) {
        var pNode = document.createElement('p');
        var textNode = document.createTextNode(paragraphs[i]);
        if($filter('isLink')(paragraphs[i])) {
          var aNode = document.createElement('a');
          aNode.appendChild(textNode);
          aNode.setAttribute('href', paragraphs[i]);
          aNode.setAttribute('target', '_blank');
          pNode.appendChild(aNode);
        } else  {
          pNode.appendChild(textNode);
        }
        angular.element('.summernote').summernote('insertNode', pNode);
      }
    };


    var insertImage = function (src, id, url) {
      setCurrentRange($scope.previousRange);

      src = src || 'http://img762.ph.126.net/LLzXH6ArV6ystmyvHmYy3g==/4884435270860289921.jpg';
      id = id || 1;

      var img = document.createElement('img');
      img.setAttribute('data-image-id', id);
      img.setAttribute('src', src);
      img.setAttribute('url',url);
      var div = document.createElement('div');
      div.appendChild(img);
      div.setAttribute('class', 'xb-answer-img-bg');
      angular.element('.summernote').summernote('insertNode', div);

      img.setAttribute('class', 'pre-loading');
      img.onload = function () {
        this.setAttribute('class', '');
      };
      img.onerror = function () {
        this.setAttribute('class', '');
      };

      $timeout(function () {
        $scope.setPreviousRange();
      }, 100);

    };

    var imageSuccessCallback = function (data) {
      insertImage(data.imageUrl, data.id, data.url);
    };

    var errorCallbackNew = function (error) {
      // Don't display error when user cancels upload
      if (error.status === -1) {
        return;
      }

      growl.error('Failed to upload');
    };

    $scope.imageUpload = function (files) {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      for (var i = 0; i < files.length; i++) {
        UploadService.uploadFile(files[i], 'REVIEW_REPORT_DETAILS', $scope)
          .then(function (data) {
            imageSuccessCallback(data.data);
          }, errorCallbackNew);
      }
    };

    $scope.onChange = function (contents) {
      $scope.detailCharacterCount = contents.replace("< *iframe(.|/r|/n)+?/iframe *>","")
        .replace(/(?:<([^>]+)>)/ig, "").replace(/(?:&[^;]{2,6};)/ig, "").length;
    };

    $scope.submitForm = function(blog){
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
            tab:'posts',
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
          tab:'posts',
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

    var title = 'Share an Offer';
    var description = 'Help others save big by finding the best deals and the lowest price!';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
