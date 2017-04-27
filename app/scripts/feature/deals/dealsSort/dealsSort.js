angular.module('xbertsApp')
  .directive('dealsSort', function () {
    return {
      restrict: 'E',
      scope: {
        sort: '=',
        onSortChange: '&',
        sortId: '='
      },
      templateUrl: 'scripts/feature/deals/dealsSort/deals-sort.html',
      link: function (scope, element, attrs, ctrls) {
        scope.sort = scope.sort || [];

        scope.selectedSortId = scope.sortId;

        scope.selectedSort = function(selectedSort) {
          scope.selectedSortId = selectedSort.id;
        }
      }
    }
  });
