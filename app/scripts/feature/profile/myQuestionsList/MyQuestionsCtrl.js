'use strict';

angular.module('xbertsApp')
  .controller('MyQuestionsCtrl', ['$scope', '$rootScope','expert','Paginator','AskModel','AskService','$stateParams',
    function ($scope, $rootScope,expert,Paginator,AskModel,AskService, $stateParams) {
      $rootScope.pageSettings.setBackgroundColor('background-bg-light');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.userId;

      var parQuestion = {
        name: 'questions_list_posts_' + $stateParams.expertId,
        objClass: AskModel,
        params: {
          owner: $stateParams.expertId,
          page_size: 12
        },
        fetchFunction: AskService.getList
      };
      $scope.postsQuestionPaginator = new Paginator(parQuestion);

    }]);
