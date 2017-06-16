angular.module('xbertsApp')
  .directive('dealsFilter', ['DealsService',function (DealsService) {
    return {
      restrict: 'E',
      scope: {
        filter: '=',
        onFilterChange: '&',
        filterId: '='
      },
      templateUrl: 'scripts/feature/deals/dealsFilter/deals-filter.html',
      link: function (scope, element, attrs, ctrls) {

        scope.open = function() {
          scope.categoryOpen = !scope.categoryOpen;
        };

        scope.close = function() {
          scope.categoryOpen = false;
        };

        scope.filterPrice = function(e) {
          for(var i = 0; i < e.length;i++) {
            if(e[i].id == scope.filterId) {
              return e[i].name;
            }
          }
          return false;
        };
      }
    }
  }]);
