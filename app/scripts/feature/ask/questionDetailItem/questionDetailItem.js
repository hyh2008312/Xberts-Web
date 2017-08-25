angular.module('xbertsApp')
  .directive('questionDetailItem',['$rootScope','AskService','InviteService','$mdDialog','$mdBottomSheet',
    'localStorageService','$state','AskModel','Paginator',
    function ($rootScope,AskService,InviteService,$mdDialog,$mdBottomSheet,localStorageService,$state,AskModel,Paginator) {
    return {
      restrict: 'E',
      scope: {
        product : '=',
        showAnswer : '=',
        answers : '='
      },
      templateUrl: 'scripts/feature/ask/questionDetailItem/question-detail-item.html',
      link: function (scope, element, attrs, ctrls) {

        var _offsetTop = angular.element('.xb-items-bottom-line').offset().top - 112;

        angular.element('.xb-body-view').bind("scroll", function(e) {
          if(e.currentTarget.scrollTop >= _offsetTop) {
            angular.element('.xb-question-detail__fixed-top-content').css({
              display:'block',
              position: 'fixed',
              left:'0',
              top: 56 +'px'
            });
          } else {
            angular.element('.xb-question-detail__fixed-top-content').css({
              display:'none',
              position: 'relative',
              top: 'auto'
            });
          }
        });

        scope.user = $rootScope.user;

        var showConfirm = function(ev) {
          var confirm = $mdDialog.confirm()
            .textContent('You have already answered this question. Would you like to edit it?')
            .ariaLabel('Answer alert')
            .targetEvent(ev)
            .ok('Edit')
            .cancel('Cancel');

          $mdDialog.show(confirm).then(function() {
            $state.go('application.protected.editAnswer', {answerId:scope.answers[0].id});
          }, function() {});
        };

        scope.answer = function(scrollTopAnswer,ev) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          if(scope.answers && scope.answers.length > 0) {
            showConfirm(ev);
            return;
          }
          if(scope.answers == null && $rootScope.user.getUserId()) {
            var par = {
              name: 'ask_answers_detail',
              objClass: AskModel,
              params: {
                owner: $rootScope.user.getUserId(),
                question: scope.product.id,
                page_size: 12
              },
              fetchFunction: AskService.getAnswersList
            };
            var _par = new Paginator(par).load();
            _par.then(function(data) {
                console.log(data);
              scope.answers = data.items;
              if(scope.answers.length > 0) {
                showConfirm();
                return;
              }
              scope.showAnswer = !scope.showAnswer;
              if(scrollTopAnswer == true) {
                scope.showAnswer = true;
                angular.element('.xb-body-view').scrollTop(50);
              }
            });

            return;
          }
          scope.showAnswer = !scope.showAnswer;
          if(scrollTopAnswer == true) {
            scope.showAnswer = true;
            angular.element('.xb-body-view').scrollTop(50);
          }
        };

        scope.answerMobile = function(ev) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          if(scope.answers && scope.answers.length > 0) {
            showConfirm(ev);
            return;
          }
          if(scope.answers == null && $rootScope.user.getUserId()) {
            var par = {
              name: 'ask_answers_detail',
              objClass: AskModel,
              params: {
                owner: $rootScope.user.getUserId(),
                question: scope.product.id,
                page_size: 12
              },
              fetchFunction: AskService.getAnswersList
            };
            scope.answers = new Paginator(par).load().items;
            if(scope.answers.length > 0) {
              showConfirm();
              return;
            }
            $state.go('application.protected.answerPost',{questionId:scope.product.id});
            return;
          }
          $state.go('application.protected.answerPost',{questionId:scope.product.id});
        };

        scope.follow = function(product) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          AskService.follow(product.id).then(function(data) {
            if(product.currentUser) {
              product.currentUser.follow = data.follow;
            } else {
              product.currentUser = {};
              product.currentUser.follow = data.follow;
            }
            if(data.follow) {
              product.followeeCount++;
            } else {
              product.followeeCount--;
            }
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_currentPage');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_items');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_next');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_count');
          }, function() {});
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
              scope.answer = {};
              scope.imgLoaded = false;
              scope.showMask = false;
              scope.formToggle = true;
              scope.onShowMask = function() {
                scope.showMask = !scope.showMask;
              };

              scope.offDeleteImage = function() {
                scope.showMask = false;
                scope.imgLoaded = false;
                scope.answer.image = null;
              };

              var coverSuccessCallback = function (data) {
                scope.showMask = false;
                scope.imgLoaded = true;
                scope.answer.image = data.data.id;
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

              scope.submitForm = function(answer,answerForm){
                if(!$rootScope.user.authRequired()) {
                  scope.cancel();
                  return;
                }
                if (!answerForm.$valid) {
                  return;
                }

                var _product = {
                  question: scope.questionId,
                  description: answer.description,
                  productLink: {
                    url:answer.productLink
                  },
                  image:answer.image,
                  videoUrl:answer.videoUrl
                };

                // post start
                scope.$emit('backdropOn', 'fetch project');
                AskService.createAnswers(_product).then(function (newProduct) {
                  scope.$emit('backdropOff', 'success');
                  scope.answer = {};
                  scope.offDeleteImage();
                  scope.formToggle = !scope.formToggle;
                  scope.detailCtrl.addProduct(newProduct);
                  scope.cancel();
                  angular.element('.xb-body-view').scrollTop(angular.element('.xb-question-detail__answer-title').offset().top);
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

        scope.showListBottomSheet = function() {
          $mdBottomSheet.show({
            templateUrl: 'scripts/feature/ask/questionDetailItem/question-detail-bottom-sheet.html',
            controller: function($scope, $mdBottomSheet) {
              $scope.hidden = false;
              $scope.isOpen = false;
              $scope.hover = false;
              $scope.shareList = [
                { name: "facebook" },
                { name: "linkedin" },
                { name: "twitter" }
              ];

              $scope.product = scope.product;
              $scope.inviteObj = scope.inviteObj;
            }
          }).then(function() {

          }).catch(function(error) {
            // User clicked outside or hit escape
          });
        };

        scope.user = $rootScope.user;
      }
    }
  }]);
