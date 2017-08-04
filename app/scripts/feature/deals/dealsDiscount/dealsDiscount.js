angular.module('xbertsApp')
  .directive('dealsDiscount', ['DealsService',function (DealsService) {
    return {
      restrict: 'E',
      scope: {
        discount: '=',
        onDiscountChange: '&',
        discountId: '='
      },
      templateUrl: 'scripts/feature/deals/dealsDiscount/deals-discount.html',
      link: function (scope, element, attrs, ctrls) {

        scope.open = function() {
          scope.categoryOpen = !scope.categoryOpen;
        };

        scope.close = function() {
          scope.categoryOpen = false;
        };

        scope.filterDiscount = function(e) {
          for(var i = 0; i < e.length;i++) {
            if(e[i].id == scope.discountId) {
              return e[i].name;
            }
          }
          return false;
        };
      }
    }
  }]);
