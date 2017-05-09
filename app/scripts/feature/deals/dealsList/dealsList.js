angular.module('xbertsApp')
  .directive('dealsList', ['$rootScope',function ($rootScope) {
    return {
      restrict: 'E',
      scope: {
        deals: '='
      },
      templateUrl: 'scripts/feature/deals/dealsList/deals-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.deals = scope.deals || [];
        scope.user = $rootScope.user;
      }
    }
  }]);
