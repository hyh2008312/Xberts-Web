angular.module('xbertsApp')
  .directive('creditRedeem', function () {
    return {
      restrict: 'E',
      scope: {
        redeems: '='
      },
      templateUrl: 'scripts/feature/credit/creditRedeem/credit-redeem.html',
      link: function (scope, element, attrs, ctrls) {
        scope.redeems = scope.redeems || [];
      }
    }
  });
