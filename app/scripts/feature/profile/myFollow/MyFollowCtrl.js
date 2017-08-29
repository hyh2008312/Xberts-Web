'use strict';

angular.module('xbertsApp')
  .controller('MyFollowCtrl', ['Paginator','$scope', '$rootScope','expert','ExpertService','AskModel',
    function (Paginator,$scope, $rootScope,expert,ExpertService,AskModel) {

      $rootScope.pageSettings.setBackgroundColor('background-bg-light');
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.userId;
      $scope.expert = expert;

      $scope.selectedIndex = 0;

      var parfollowing = {
        name: 'followings_list_' + $scope.expert.userId,
        params: {
          id: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.followees
      };
      $scope.followingPaginator = new Paginator(parfollowing);

      var parfollower = {
        name: 'followers_list_' + $scope.expert.userId,
        params: {
          id: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.followers
      };
      $scope.followerPaginator = new Paginator(parfollower);

      var parfollowingQuestions = {
        name: 'following_answers_list_' + $scope.expert.userId,
        objClass: AskModel,
        params: {
          id: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.getFollowingQuestion
      };
      $scope.followingQuestionsPaginator = new Paginator(parfollowingQuestions);

      $scope.load = function(index) {
        $scope.selectedIndex = index;
      };


    }]);
