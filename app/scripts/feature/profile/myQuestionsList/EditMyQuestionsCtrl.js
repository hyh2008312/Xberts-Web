'use strict';

angular.module('xbertsApp')
  .controller('EditMyQuestionsCtrl', ['$rootScope', '$scope', 'editMyQuestion', 'AskService', '$state', 'localStorageService',
    function ($rootScope, $scope, editMyQuestion, AskService, $state, localStorageService) {

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
          $state.go('application.expert', {
            tab:'posts',
            expertId: $rootScope.user.getUserId()
          },{
            reload:true
          });
          $scope.$emit('backdropOff', 'success');
        },function() {
          $scope.$emit('backdropOff', 'failure');
        });
      };

      $scope.reset = function() {
        $scope.question = angular.copy(oldPost,{});
      };
  }]);
