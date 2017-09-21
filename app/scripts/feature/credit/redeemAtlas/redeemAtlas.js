angular.module('xbertsApp')
  .directive('redeemAtlas', function () {
    return {
      restrict: 'E',
      scope: {
        atlas: '='
      },
      templateUrl: 'scripts/feature/credit/redeemAtlas/redeem-atlas.html',
      link: function (scope, element, attrs, ctrls) {

      }
    }
  });
