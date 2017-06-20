angular.module('xbertsApp')
  .directive('dealsMainList', ['DealsService',function (DealsService) {
    return {
      restrict: 'E',
      scope: {
        deals: '='
      },
      templateUrl: 'scripts/feature/main/dealsList/deals-main-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.deals = scope.deals || [];

        scope.headImage = DealsService.headImage;

        scope.page = 0;
      }
    }
  }]);
