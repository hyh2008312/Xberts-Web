angular.module('xbertsApp')
  .directive('questionDetailItem',['$rootScope','AskService','InviteService','$mdDialog','growl',
    function ($rootScope,AskService,InviteService,$mdDialog,growl) {
    return {
      restrict: 'E',
      scope: {
        product: '='
      },
      templateUrl: 'scripts/feature/ask/questionDetailItem/question-detail-item.html',
      link: function (scope, element, attrs, ctrls) {

        scope.follow = function(product) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          scope.$emit('backdropOn', 'post');
          AskService.follow(product.id).then(function(data) {
            product.currentUser.follow = data.follow;
            if(data.follow) {
              product.followeeCount++;
            } else {
              product.followeeCount--;
            }
            scope.$emit('backdropOff', 'success');
          }, function() {
            scope.$emit('backdropOff', 'failure');
          });
        };


        // FAB Speed Dial Component
        // Set the component to the normal state
        scope.hidden = false;
        scope.isOpen = false;
        scope.hover = false;
        scope.shareList = [
          { name: "facebook" },
          { name: "linkedin" },
          { name: "twitter" }
        ];

        scope.inviteObj = angular.copy(InviteService, {});

        scope.answerQuestion = function(ev) {
          $mdDialog.show({
            controller: function(scope, $mdDialog) {

              scope.cancel = function() {
                $mdDialog.cancel();
              };
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
                  scope.cancel();
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
                  scope.cancel();
                }, function () {
                  // tips
                  scope.$emit('backdropOff', 'project get error');
                  // post end
                });
              };
            },
            templateUrl: 'scripts/feature/ask/answerPost/answer-post.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            disableParenScroll: true,
            fullscreen:true
          });
        };
      }
    }
  }]);
