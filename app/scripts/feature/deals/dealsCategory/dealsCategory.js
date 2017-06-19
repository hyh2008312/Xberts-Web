angular.module('xbertsApp')
  .directive('dealsCategory', [function () {
    return {
      restrict: 'E',
      scope: {
        categories: '=',
        onCategoryChange: '&',
        categoryId: '='
      },
      templateUrl: 'scripts/feature/deals/dealsCategory/deals-category.html',
      link: function (scope, element, attrs, ctrls) {
        scope.categories = scope.categories || [];
        if(scope.categories[0].name != 'All') {
          scope.categories.unshift({
            name:'All Categories'
          });
        }

        scope.filterCatergoy = function(e) {
          for(var i = 0; i < e.length;i++) {
            if(e[i].id == scope.categoryId) {
              return e[i].name;
            }
          }
        };

        scope.open = function() {
          scope.categoryOpen = !scope.categoryOpen;
        };
      }
    }
  }]);
