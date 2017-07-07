'use strict';

angular.module('xbertsApp')
  .controller('MyAnswersCtrl', ['$scope', '$rootScope','expert','Paginator','AskModel','ExpertService','$stateParams',
    function ($scope, $rootScope,expert,Paginator,AskModel,ExpertService, $stateParams) {
      $rootScope.pageSettings.setBackgroundColor('background-bg-light');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.userId;

      var parAnswers = {
        name: 'answers_list_posts_' + $stateParams.expertId,
        objClass: AskModel,
        params: {
          id: $stateParams.expertId,
          page_size: 12
        },
        fetchFunction: ExpertService.getAnswersList
      };
      $scope.postsAnswerPaginator = new Paginator(parAnswers);

    }]);
