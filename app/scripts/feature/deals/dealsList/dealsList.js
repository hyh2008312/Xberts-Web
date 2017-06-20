angular.module('xbertsApp')
  .directive('dealsList', ['$rootScope','DealsService',function ($rootScope, DealsService) {
    return {
      restrict: 'E',
      scope: {
        deals: '='
      },
      templateUrl: 'scripts/feature/deals/dealsList/deals-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;

        scope.headImage = DealsService.headImage;

      }
    }
  }]);
