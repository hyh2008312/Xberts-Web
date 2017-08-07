angular.module('xbertsApp')
  .directive('dealsCategory', ['DealsService', function (DealsService) {
    return {
      restrict: 'E',
      scope: {
        categories: '=',
        onCategoryChange: '&',
        categoryId: '='
      },
      templateUrl: 'scripts/feature/deals/dealsCategory/deals-category.html',
      link: function (scope, element, attrs, ctrls) {

        scope.page = 0;

      }
    }
  }]);
