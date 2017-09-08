'use strict';

angular.module('xbertsApp')
  .directive('loadAskMore', function () {
    return {
      templateUrl: 'scripts/feature/loading/ask/load-ask-more.html',
      restrict: 'E',
      replace: false,
      scope: {

      }
    };
  });
