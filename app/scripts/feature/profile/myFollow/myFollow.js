angular.module('xbertsApp')
  .directive('myFollow', ['$rootScope', function($rootScope) {
    return {
      restrict: 'E',
      scope: {
        experts: '=',
        following: '=',
        achievement: '=',
        expert: '='
      },
      templateUrl: 'scripts/feature/profile/myFollow/my-follow.html',
      link: function (scope, element, attrs, ctrls) {

        var deregister = $rootScope.$on('$stateChangeSuccess', function() {
          scope.changeFolloweeList();
        });

        scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          //you also get the actual event object
          //do stuff, execute functions -- whatever...

          scope.changeFolloweeList();
        });

        scope.changeFolloweeList = function() {

          var followeeList = $rootScope.user.getFollowees();

          angular.forEach(scope.experts, function(e,i) {
            e.currentUser = {
              follow : false
            };

            angular.forEach(followeeList, function(f) {
              if(f == e.id) {
                e.currentUser.follow = true;
              }
            });

          });
        };

        scope.$on('$destory', function() {
          // destroy event
          deregister();
        });

      }
    }
  }]);
