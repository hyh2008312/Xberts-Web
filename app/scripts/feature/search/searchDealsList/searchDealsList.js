angular.module('xbertsApp')
  .directive('searchDealsList', [function () {
    return {
      restrict: 'E',
      scope: {
        deals: '=',
        isAll: '='
      },
      templateUrl: 'scripts/feature/search/searchDealsList/search-deals-list.html',
      link: function (scope, element, attrs, ctrls) {

      }
    }
  }]);
