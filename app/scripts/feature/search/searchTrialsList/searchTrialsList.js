'use strict';

angular.module('xbertsApp')
  .directive('searchTrialList', function () {
    return {
      templateUrl: "scripts/feature/search/searchTrialsList/search-trials-List.html",
      scope: {
        trials: "="
      },
      link: function (scope, element, attrs, ctrls) {

      }
    }
  });
