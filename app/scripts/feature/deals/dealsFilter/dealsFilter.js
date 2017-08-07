angular.module('xbertsApp')
  .directive('dealsFilter', ['$mdBottomSheet','$mdMedia',function ($mdBottomSheet,$mdMedia) {
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

        scope.openSheet = function() {
          if($mdMedia('xs')) {
            $mdBottomSheet.show({
              templateUrl: 'scripts/feature/deals/dealsFilter/deals-filter-bottom-sheet.html',
              controller: function($scope, $mdBottomSheet) {
                $scope.filter = scope.filter;
                $scope.onFilterChange = scope.onFilterChange;
                $scope.filterId = scope.filterId;

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
