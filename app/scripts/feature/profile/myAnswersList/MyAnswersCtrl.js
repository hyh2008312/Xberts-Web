'use strict';

angular.module('xbertsApp')
  .controller('MyAnswersCtrl', ['$scope', '$rootScope','expert','Paginator','AskModel','AskService','$stateParams',
    function ($scope, $rootScope,expert,Paginator,AskModel,AskService, $stateParams) {
      $rootScope.pageSettings.setBackgroundColor('background-bg-light');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.userId;

      var parAnswers = {
        name: 'answers_list_posts_' + $stateParams.expertId,
        objClass: AskModel,
        params: {
          owner: $stateParams.expertId,
          page_size: 12
        },
        fetchFunction: AskService.getAnswersList
      };
      $scope.postsAnswerPaginator = new Paginator(parAnswers);

    }]);
