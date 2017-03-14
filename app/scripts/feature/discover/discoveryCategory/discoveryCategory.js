angular.module('xbertsApp')
  .directive('discoveryCategory', function () {
    return {
      restrict: 'E',
      scope: {
        categories: '='
      },
      templateUrl: 'scripts/feature/discover/discoveryCategory/discovery-category.html',
      link: function (scope, element, attrs, ctrls) {
        scope.categories = scope.categories || [];
      }
    }
  });
