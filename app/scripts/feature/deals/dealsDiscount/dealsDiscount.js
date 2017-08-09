angular.module('xbertsApp')
  .directive('dealsDiscount', ['$mdBottomSheet', '$mdMedia', function ($mdBottomSheet, $mdMedia) {
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

        scope.openSheet = function() {
          if($mdMedia('xs')) {
            $mdBottomSheet.show({
              templateUrl: 'scripts/feature/deals/dealsDiscount/deals-discount-bottom-sheet.html',
              controller: function($scope, $mdBottomSheet) {
                $scope.discount = scope.discount;
                $scope.onDiscountChange = scope.onDiscountChange;
                $scope.discountId = scope.discountId;

                $scope.close = function() {
                  $mdBottomSheet.cancel();
                };
              }
            }).then(function(clickedItem) {

            }).catch(function(error) {

            });
          }

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
