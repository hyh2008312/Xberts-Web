angular.module('xbertsApp')
  .directive('discoveryCategory', function () {
    return {
      restrict: 'E',
      scope: {
        categories: '=',
        onCategoryChange: '&'
      },
      templateUrl: 'scripts/feature/discover/discoveryCategory/discovery-category.html',
      link: function (scope, element, attrs, ctrls) {
        scope.categories = scope.categories || [];
        scope.categories.unshift({
          name:'All'
        });
        scope.selectedCategoryId = null;
        scope.selectedCategory = function(selectedCategory) {
          scope.selectedCategoryId = selectedCategory.id;
        }
      }
    }
  });
