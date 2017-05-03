angular.module('xbertsApp')
  .directive('myTrials', function() {
    return {
      restrict: 'E',
      scope: {
        trials: '='
      },
      templateUrl: 'scripts/feature/profile/myTrials/my-trials.html',
      link: function (scope, element, attrs, ctrls) {

      }
    }
  });
