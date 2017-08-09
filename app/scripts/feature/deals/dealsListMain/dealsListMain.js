angular.module('xbertsApp')
  .directive('dealsListMain', ['DealsService',function (DealsService) {
    return {
      restrict: 'E',
      scope: {
        deals: '='
      },
      templateUrl: 'scripts/feature/deals/dealsListMain/deals-list-main.html',
      link: function (scope, element, attrs, ctrls) {
        scope.deals = scope.deals || [];

      }
    }
  }]);
