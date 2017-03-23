angular.module('xbertsApp')
  .directive('discoverProductsList', function () {
    return {
      restrict: 'E',
      scope: {
        products: '='
      },
      templateUrl: 'scripts/feature/main/discoverProductsList/discover-products-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.showProduct = scope.products[0];

        scope.changeShowProduct = function(product) {
          scope.showProduct = product;
        };

        // FAB Speed Dial Component
        // Set the component to the normal state
        scope.hidden = false;
        scope.isOpen = false;
        scope.hover = false;
        scope.shareList = [
          { name: "facebook" },
          { name: "twitter"},
          { name: "linkedin"}
        ];
        scope.commentToggle = false;

        scope.onToggleDown = function() {
          scope.commentToggle = !scope.commentToggle;
        };
      }
    }
  });
