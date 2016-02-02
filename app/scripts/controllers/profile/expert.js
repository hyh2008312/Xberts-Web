'use strict';

angular.module('xbertsApp')
  .controller('ExpertCtrl', ['$scope', '$rootScope', '$location', '$state', '$stateParams', '$uibModal', '_', 'Paginator',
    'ProjectsNoDetail', 'Interact', 'expert', 'roleRequests', 'Applicantsreview', 'SystemConstant',
    function ($scope, $rootScope, $location, $state, $stateParams, $uibModal, _, Paginator,
              ProjectsNoDetail, Interact, expert, roleRequests, Applicantsreview, SystemConstant) {
      $rootScope.bodyBackground = 'background-whitem';
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.user_id;
      $scope.pendingExpert = $scope.isCurrentUser && roleRequests.length > 0;
      $scope.isExpert = _($scope.expert.roles).contains(SystemConstant.ROLES.DOMAIN_EXPERT);
      $scope.btnText = 'Send';
      $scope.btnSecret = true;
      $scope.isOutDated = function (time) {
        return Date.now()-new Date(time)> 0;
      };
      $scope.tabs = [
        {title: 'profile', active: true},
        {title: 'products', active: false},
        {title: 'followers', active: false},
        {title: 'followings', active: false},
        {title: 'comments', active: false},
        {title: 'reviews', active: false}
      ];
      //todo: 交互信息可能发生变化,重读交互信息
      // before entering into detail page, should the project interact info
      $scope.projectsTabActive = false;
      $scope.followingsTabActive = false;
      $scope.commentsTabActive = false;
      $scope.followersTabActive = false;
      $scope.reviewsTabActive = false;
      $scope.select = function (step) {
        $scope.projectsTabActive = false;
        $scope.followingsTabActive = false;
        $scope.commentsTabActive = false;
        $scope.followersTabActive = false;
        $scope.reviewsTabActive = false;
        switch (step) {
          case 'products':
            $scope.projectsTabActive = true;
            var fetchFunction = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, account_id: $scope.expert.user_id};
              angular.extend(params, otherParams);
              ProjectsNoDetail.get(params, callback);
            };
            $scope.projectPaginator = Paginator('project_' + $scope.expert.user_id, fetchFunction);
            $scope.projectPaginator.clear();
            break;
          case 'followers':
            $scope.followersTabActive = true;
            var fetchFunction1 = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, interact_id: $scope.expert.interact.id, vote: 'True'};
              angular.extend(params, otherParams);
              var followers = Interact.Join(params);
              followers.get(params, callback);
            };
            $scope.followersPaginator = Paginator('followers_' + $scope.expert.user_id, fetchFunction1);
            $scope.followersPaginator.clear();
            break;
          case 'followings':
            $scope.followingsTabActive = true;
            var fetchFunction2 = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, joiner_id: $scope.expert.user_id, vote: 'True', interact__type: '0'};
              angular.extend(params, otherParams);
              var followings = Interact.Following(params);
              followings.get(params, callback);
            };
            $scope.followingsPaginator = Paginator('followings_' + $scope.expert.user_id, fetchFunction2);
            $scope.followingsPaginator.clear();
            break;
          case 'comments':
            $scope.commentsTabActive = true;
            // TODO: Doesn't seem be used, remove if no issue is seen
            //$scope.$broadcast('feedback', step);
            break;
          case 'reviews':
            $scope.reviewsTabActive = true;
            var fetchFunction3 = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, reviewer_id: $scope.expert.user_id};
              angular.extend(params, otherParams);
              Applicantsreview.get(params, callback);
            };
            $scope.reviewApplicantPaginator = Paginator('reviewapplicant_' + $scope.expert.user_id, fetchFunction3);
            $scope.reviewApplicantPaginator.clear();
            break;
        }

        // Update query param in URL
        $location.search('tab', step);

        // TODO: Doesn't seem be used, remove if no issue is seen
        //$scope.$broadcast('expert', step);
      };
      var search = $location.search();
      var tab = search.tab || 'profile';
      if (search.tab) {
        for (var i = 0; i < $scope.tabs.length; i++) {
          $scope.tabs[i].active = $scope.tabs[i].title === search.tab;
        }
      }

      if ($stateParams.action === 'applyExpert' && $rootScope.user.authRequired() && $scope.isCurrentUser &&
          !$scope.isExpert && !$scope.pendingExpert) {
        console.log('expert application process triggered');

        if (!$rootScope.user.isLinkedinConnected()) {
          $uibModal.open({
            templateUrl: 'views/profile/linkedin-connect-modal.html',
            controller: 'LinkedinConnectCtrl',
            scope: $scope
          });
        } else {
          var applyExpertModal = $uibModal.open({
            templateUrl: 'views/profile/apply-expert-modal.html',
            controller: 'ApplyExpertCtrl',
            scope: $scope,
            resolve: {
              stages: ['SystemData', function(SystemData) {
                return SystemData.getStagesPromise();
              }]
            }
          });

          applyExpertModal.result
            .then(function() {
              $state.go('application.protected.profile', {}, {location: "replace"});
            })
            .catch(function() {
              $location.search('action', null);
            });
        }
      }

      $scope.editProfile = function() {
        $state.go('application.protected.editProfile');
      };

    }]);
