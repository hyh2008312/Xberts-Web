'use strict';

angular.module('xbertsApp')
  .controller('EditQuestionsCtrl', ['$rootScope', '$scope', 'AskService', '$state', 'localStorageService','$mdDialog',
    '$mdMedia','category',
    function ($rootScope, $scope, AskService, $state, localStorageService,$mdDialog,$mdMedia,category) {

      $scope.question = {};
      $scope.disabled = false;
      $scope.isFirstPost = true;
      $scope.categoryoptions = category;

      $scope.askQuestion = function(question) {
        if(!$rootScope.user.authRequired()) {
          return;
        }
        if (!$scope.recommendation.$valid) {
          return;
        }

        $scope.$emit('backdropOn', 'post');
        $scope.disabled = true;
        AskService.create(question).then(function() {

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
      var backgroundColor = 'background-bg-whitem';
      var shareImage = null;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
