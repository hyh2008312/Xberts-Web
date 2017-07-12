angular.module('xbertsApp')
  .directive('xbFollow', ['$rootScope','ExpertService','localStorageService',
    function($rootScope,ExpertService,localStorageService) {
    return {
      restrict: 'E',
      scope: {
        follow: '=',
        userId: '=',
        experts: '=',
        index: '=',
        following:'=',
        achievement: '=',
        expert: '='
      },
      templateUrl: 'scripts/feature/profile/xbFollow/xb-follow.html',
      link: function (scope, element, attrs, ctrls) {

        scope.disabled = false;
        scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === scope.userId;
        scope.addFollow = function () {
          if (!$rootScope.user.authRequired()) {
            return;
          }
          scope.disabled = true;
          ExpertService.follow({id:scope.userId}).then(function(data) {
            scope.disabled = false;

            if(data.follow == false && scope.achievement && $rootScope.user.getUserId() === scope.expert.userId) {
              scope.achievement.followeesAmount--;
            }
            if(data.follow == true && scope.achievement && $rootScope.user.getUserId() === scope.expert.userId) {
              scope.achievement.followeesAmount++;
            }
            if(data.follow == false && scope.achievement && $rootScope.user.getUserId() != scope.expert.userId) {
              scope.achievement.followersAmount--;
            }
            if(data.follow == true && scope.achievement && $rootScope.user.getUserId() != scope.expert.userId) {
              scope.achievement.followersAmount++;
            }
            if(data.follow == false && scope.following == true && $rootScope.user.getUserId() === scope.expert.userId) {
              scope.experts.splice(scope.index,1);
              return false;
            }
            scope.follow = data.follow;
            localStorageService.clearAll();
          }, function() {

          });
        };

      }
    }
  }]);
