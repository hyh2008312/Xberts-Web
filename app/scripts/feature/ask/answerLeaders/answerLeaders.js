angular.module('xbertsApp')
  .directive('answerLeaders', ['$rootScope',function ($rootScope) {
    return {
      restrict: 'E',
      scope: {
        leaders: '='
      },
      templateUrl: 'scripts/feature/ask/answerLeaders/answer-leaders.html',
      link: function (scope, element, attrs, ctrls) {

        scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          //you also get the actual event object
          //do stuff, execute functions -- whatever...

          scope.changeFolloweeList();
        });

        scope.changeFolloweeList = function() {

          var followeeList = $rootScope.user.getFollowees();

          angular.forEach(scope.leaders, function(e) {
            e.user.currentUser = {
              follow : false
            };

            angular.forEach(followeeList, function(f) {
              if(f == e.user.id) {
                e.user.currentUser.follow = true;
              }
            });
          });
        };

      }
    }
  }]);
