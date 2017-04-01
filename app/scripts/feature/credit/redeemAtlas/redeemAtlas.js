angular.module('xbertsApp')
  .directive('redeemAtlas', function () {
    return {
      restrict: 'E',
      scope: {
        atlas: '='
      },
      templateUrl: 'scripts/feature/credit/redeemAtlas/redeem-atlas.html',
      link: function (scope, element, attrs, ctrls) {
        scope.atlas = scope.atlas || [];
        scope.atlasNow = scope.atlas[0];
        scope.changePicture = function($index) {
          scope.atlasNow = scope.atlas[$index];
        };
      }
    }
  });
