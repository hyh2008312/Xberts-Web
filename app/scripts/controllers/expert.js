'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:ExpertCtrl
 * @description
 * # ExpertCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('ExpertCtrl', ['$scope', '$rootScope', '$stateParams','Paginator','ProjectsNoDetail', 'Interact','expert',
    function ($scope, $rootScope, $stateParams,Paginator,ProjectsNoDetail, Interact,expert) {
      $rootScope.bodyBackground = 'background-whitem';
      $scope.expert=expert;
      console.log(expert);
      //todo: 交互信息可能发生变化,重读交互信息
      // before entering into detail page, should the project interact info
      $scope.projectsTabActive=false;
      $scope.followingsTabActive=false;
      $scope.commentsTabActive=false;
      $scope.followersTabActive=false;
      $scope.select = function (step) {
        $scope.projectsTabActive=false;
        $scope.followingsTabActive=false;
        $scope.commentsTabActive=false;
        $scope.followersTabActive=false;
        switch (step){
          case 'products':
            $scope.projectsTabActive=true;
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage,account_id:$scope.expert.user_id};
              angular.extend(params, otherParams);
              ProjectsNoDetail.get(params, callback);
            };
            $scope.projectPaginator = Paginator('project_'+$scope.expert.user_id, fetchFunction);
            $scope.projectPaginator.clear();
            break;
          case 'followers':
            $scope.followersTabActive=true;
            var fetchFunction1 = function (nextPage, otherParams, callback) {
              var params = {page: nextPage,interact_id:$scope.expert.interact.id,vote:'True'};
              angular.extend(params, otherParams);
              var followers = Interact.Join(params);
              followers.get(params, callback);
            };
            $scope.followersPaginator = Paginator('followers_'+$scope.expert.user_id, fetchFunction1);
            $scope.followersPaginator.clear();
            break;
          case 'followings':
            $scope.followingsTabActive=true;
            var fetchFunction2 = function (nextPage, otherParams, callback) {
              var params = {page: nextPage,joiner_id:$scope.expert.user_id,vote:'True',interact__type:'0'};
              angular.extend(params, otherParams);
              var followings = Interact.Following(params);
              followings.get(params, callback);
            };
            $scope.followingsPaginator = Paginator('followings_'+$scope.expert.user_id, fetchFunction2);
            $scope.followingsPaginator.clear();
            break;
          case 'comments':
            $scope.commentsTabActive=true;
            $scope.$broadcast('feedback', step);
            break;
        }
        $scope.$broadcast('expert', step);
      };
    }]);
