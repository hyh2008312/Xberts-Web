'use strict';

angular.module('xbertsApp')
  .controller('EditMyQuestionsCtrl', ['$rootScope', '$scope', 'editMyQuestion', 'AskService', '$state', 'localStorageService',
    '$mdMedia','$mdDialog','category',
    function ($rootScope, $scope, editMyQuestion, AskService, $state, localStorageService,$mdMedia,$mdDialog,category) {

      $scope.question = editMyQuestion;
      $scope.categoryoptions = category;

      $scope.askQuestion = function(question) {
        if(!$rootScope.user.authRequired()) {
          return;
        }
        if (!$scope.recommendation.$valid) {
          return;
        }

        $scope.$emit('backdropOn', 'post');
        AskService.updateQuestion(question).then(function() {
          localStorageService.remove('ask_questions_list' + '_currentPage');
          localStorageService.remove('ask_questions_list' + '_items');
          localStorageService.remove('ask_questions_list' + '_next');
          localStorageService.remove('ask_questions_list' + '_count');
          if($mdMedia('xs')) {
            $state.go('application.protected.questions', {
              expertId: $rootScope.user.getUserId()
            },{
              reload:true
            });
          } else {
            $state.go('application.expert', {
              tab:'questions',
              expertId: $rootScope.user.getUserId()
            },{
              reload:true
            });
          }
          $scope.$emit('backdropOff', 'success');
        },function() {
          $scope.$emit('backdropOff', 'failure');
        });
      };

      $scope.reset = function() {
        if($mdMedia('xs')) {
          $state.go('application.protected.questions', {
            expertId: $rootScope.user.getUserId()
          },{
            reload:true
          });
        } else {
          $state.go('application.expert', {
            tab:'questions',
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
          templateUrl: 'scripts/feature/profile/myQuestionsList/myQuestionTips.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          disableParenScroll: true
        });
      };

      var title = 'Ask - Ask Xberts Community & Make Smart Purchasing Decision';
      var description = 'Get recommendations and tips from our global community of savvy-shoppers';
      var backgroundColor = 'background-bg-white';
      var shareImage = null;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
