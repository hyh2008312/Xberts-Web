'use strict';

angular.module('xbertsApp')
  .controller('EditQuestionsCtrl', ['$rootScope', '$scope', 'AskService', '$state', 'localStorageService',
    function ($rootScope, $scope, AskService, $state, localStorageService) {

      $scope.question = {};
      $scope.disabled = false;
      $scope.isFirstPost = true;

      $scope.askQuestion = function(question) {
        if(!$rootScope.user.authRequired()) {
          return;
        }
        if (!$scope.recommendation.$valid) {
          return;
        }

        $scope.$emit('backdropOn', 'post');
        $scope.disabled = true;
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

          $scope.disabled = false;
        },function() {
          $scope.$emit('backdropOff', 'failure');

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
          $state.go('application.askQuestionMain', {}, {reload: true})
        }
      };
  }]);
