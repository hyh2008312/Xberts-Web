angular.module('xbertsApp')
  .directive('discoveryCategory', function () {
    return {
      restrict: 'E',
      scope: {
        categories: '=',
        onCategoryChange: '&',
        categoryId: '='
      },
      templateUrl: 'scripts/feature/discover/discoveryCategory/discovery-category.html',
      link: function (scope, element, attrs, ctrls) {
        scope.categories = scope.categories || [];
        if(scope.categories[0].name != 'All') {
          scope.categories.unshift({
            name:'All'
          });
        }

      }
    }
  });
