angular.module('xbertsApp')
  .directive('dealsFilter', function () {
    return {
      restrict: 'E',
      scope: {
        filter: '=',
        onFilterChange: '&',
        filterId: '='
      },
      templateUrl: 'scripts/feature/deals/dealsFilter/deals-filter.html',
      link: function (scope, element, attrs, ctrls) {

      }
    }
  });
