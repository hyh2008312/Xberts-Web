angular.module('xbertsApp')
  .directive('myFollow', function() {
    return {
      restrict: 'E',
      scope: {
        experts: '=',
        following: '=',
        achievement: '='
      },
      templateUrl: 'scripts/feature/profile/myFollow/my-follow.html',
      link: function (scope, element, attrs, ctrls) {

      }
    }
  });
