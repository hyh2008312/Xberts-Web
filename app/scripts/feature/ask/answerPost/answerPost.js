angular.module('xbertsApp')
  .directive('answerPost',['$rootScope','UploadService','AskService','growl',
    function ($rootScope,UploadService, AskService, growl) {
    return {
      restrict: 'E',
      scope: {
        questionId : '=',
        detailCtrl: '='
      },
      templateUrl: 'scripts/feature/ask/answerPost/answer-post.html',
      link: function (scope, element, attrs, ctrls) {

        scope.user = $rootScope.user;
        scope.product = {};
        scope.product.imageGroup = [];
        scope.imgLoaded = false;
        scope.showMask = false;
        scope.formToggle = true;
        scope.onShowMask = function() {
          scope.showMask = !scope.showMask;
        };

        scope.offDeleteImage = function() {
          scope.showMask = false;
          scope.imgLoaded = false;
          scope.product.imageGroup = [];
        };

        var coverSuccessCallback = function (data) {
          scope.showMask = false;
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

        scope.submitForm = function(product,productForm){
          if(!$rootScope.user.authRequired()) {
            return;
          }
          if (!productForm.$valid) {
            return;
          }

          var _product = {
            question: scope.questionId,
            description: product.description,
            productLink: {
              url:product.productLink
            }
          };

          // post start
          scope.$emit('backdropOn', 'fetch project');
          AskService.createAnswers(_product).then(function (newProduct) {
            scope.$emit('backdropOff', 'success');
            scope.product = {
              imageGroup : []
            };
            scope.offDeleteImage();
            scope.formToggle = !scope.formToggle;
            scope.detailCtrl.addProduct(newProduct);
            growl.success('Comment success');
          }, function () {
            // tips
            scope.$emit('backdropOff', 'project get error');
            // post end
          });
        };
      }
    }
  }]);
