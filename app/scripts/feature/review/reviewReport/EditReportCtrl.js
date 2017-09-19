'use strict';

angular.module('xbertsApp')
  .controller('EditReportCtrl', ['$rootScope', '$scope','UploadService', 'ReviewService', '$state',
    'localStorageService','$mdMedia','$mdDialog','$filter','systemImageSizeService',
    function ($rootScope, $scope, UploadService, ReviewService, $state, localStorageService,$mdMedia,$mdDialog,$filter,
              systemImageSizeService) {

    $scope.blog = {};
    $scope.disabled = false;
    $scope.isFirstPost = true;

    $scope.imgLoaded = false;
    $scope.showMask = false;

    $scope.previousRange = null;

    $scope.onShowMask = function() {
      $scope.showMask = !$scope.showMask;
    };

    $scope.offDeleteImage = function() {
      $scope.showMask = false;
      $scope.imgLoaded = false;
      $scope.blog.cover = null;
      $scope.editOrNot = false;
    };

    var coverSuccessCallback = function (data) {
      $scope.showMask = false;
      $scope.blog.cover = data.data.imageUrl;
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
      $scope.imgLoaded = true;
      $scope.showMask = false;
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


    var insertImage = function (src) {
      setCurrentRange($scope.previousRange);

      src = src || 'http://img762.ph.126.net/LLzXH6ArV6ystmyvHmYy3g==/4884435270860289921.jpg';

      var img = document.createElement('img');
      img.setAttribute('src', src);
      var div = document.createElement('div');
      div.appendChild(img);
      div.setAttribute('class', 'xb-answer-img-bg');
      var p = document.createElement('p');
      p.appendChild(div);
      angular.element('.summernote').summernote('insertNode', p);


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
      insertImage(data.imageUrl);
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
        UploadService.uploadFile(files[i], 'BLOG_DETAILS', $scope)
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

      if(blog.cover == null) {
        return;
      }

      if (blog.details) {
        blog.details = blog.details.replace(/pre-loading/ig, "");
        blog.details = blog.details.replace(/(<p><br><\/p>){3,}/ig, "<p><br></p>");
      }

      var str = blog.details;
      str = str.replace(/[ | ]*\n/g,'\n');
      str = str.replace(/<\/?[^>]*>/g,'');
      str = str.replace(/&nbsp;/ig,'');
      str = str.replace(/\s+/g,"");

      if(str == '') {
        return;
      }

      var _blog = {
        title: blog.title,
        details: blog.details,
        cover: blog.cover,
        edit_status: 'PUBLISHED'
      };

      // post start
      $scope.$emit('backdropOn', 'fetch project');
      $scope.disabled = true;
      ReviewService.postBlog(_blog).then(function(data) {

        if($mdMedia('xs')) {
          $state.go('application.protected.articles', {
            expertId: $rootScope.user.getUserId()
          },{
            reload:true
          });
        } else {
          $state.go('application.expert', {
            tab:'articles',
            expertId: $rootScope.user.getUserId()
          },{
            reload:true
          });
        }

        $scope.$emit('backdropOff', 'success');

        $scope.disabled = false;
      },function() {
        $scope.$emit('backdropOff', 'success');

        $scope.disabled = false;
      });
    };

    $scope.reset = function() {
      if ($rootScope.postLoginState) {
        $state.go($rootScope.postLoginState.state, $rootScope.postLoginState.params, {reload: true});
        $rootScope.postLoginState = null;
      } else if ($rootScope.previous && $rootScope.previous.state) {
        $state.go($rootScope.previous.state, $rootScope.previous.params, {reload: true});
      } else {
        $state.go('application.main', {}, {reload: true})
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

    $scope.myCroppedImage = false;
    $scope.editOrNot = false;

    $scope.editImage = function($file) {
      var file = systemImageSizeService.convertBase64UrlToFile($scope.myCroppedImage, $file);
      $scope.editOrNot = !$scope.editOrNot;
      if(file && $scope.editOrNot) {
        UploadService.uploadFile(file, 'BLOG_COVER', $scope)
          .then(function(data) {
            coverSuccessCallback(data)
          }, errorCallback);
      }
    };

    var title = 'Post an Articles';
    var description = 'Share your money-saving tips or first-hand reviews to inspire others!   ';
    var backgroundColor = 'background-bg-white';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
