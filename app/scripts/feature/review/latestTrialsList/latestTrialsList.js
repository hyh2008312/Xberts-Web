angular.module('xbertsApp')
  .directive('latestTrialsList', function () {
    return {
      restrict: 'E',
      scope: {
        trials: '='
      },
      templateUrl: 'scripts/feature/review/latestTrialsList/latest-trials-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.trials = scope.trials || [];
        scope.shareList = [
          { name: "facebook" },
          { name: "twitter"},
          { name: "linkedin"}
        ];

      }
    }
  });
