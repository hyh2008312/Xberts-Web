angular.module('xbertsApp')
  .directive('shareProductList', function () {
    return {
      restrict: 'E',
      scope: {
        products: '='
      },
      templateUrl: 'scripts/feature/discover/shareProductList/share-product-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.products = scope.products || [];

      }
    }
  });
