angular.module('xbertsApp')
  .directive('dealsList', function () {
    return {
      restrict: 'E',
      scope: {
        deals: '='
      },
      templateUrl: 'scripts/feature/deals/dealsList/deals-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.deals = scope.deals || [];
      }
    }
  });
