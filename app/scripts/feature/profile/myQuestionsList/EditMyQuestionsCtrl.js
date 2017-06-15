'use strict';

angular.module('xbertsApp')
  .controller('EditMyQuestionsCtrl', ['$rootScope', '$scope', 'editMyQuestion', 'AskService', '$state', 'localStorageService',
    '$mdMedia',
    function ($rootScope, $scope, editMyQuestion, AskService, $state, localStorageService,$mdMedia) {

      $scope.question = editMyQuestion;
      var oldPost = angular.copy(editMyQuestion, {});

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
        $scope.question = angular.copy(oldPost,{});
      };
  }]);
