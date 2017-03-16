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
        scope.categories.unshift({
          name:'All'
        });
        scope.selectedCategoryId = scope.categoryId ? scope.categoryId : null;

        scope.selectedCategory = function(selectedCategory) {
          scope.selectedCategoryId = selectedCategory.id;
        }
      }
    }
  });
