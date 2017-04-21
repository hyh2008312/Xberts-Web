'use strict';

angular.module('xbertsApp')
  .directive('trialList', function () {
    return {
      templateUrl: "scripts/feature/review/trialList/trialList.html",
      scope: {
        trials: "="
      },
      link: function (scope, element, attrs, ctrls) {
        scope.trials = scope.trials || [];
      }
    }
  });
