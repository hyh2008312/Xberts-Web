angular.module('xbertsApp')
  .directive('trialsList', function () {
    return {
      restrict: 'E',
      scope: {
        trials: '='
      },
      templateUrl: 'scripts/feature/main/trials/trials-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.trials = scope.trials || [];

      }
    }
  });
