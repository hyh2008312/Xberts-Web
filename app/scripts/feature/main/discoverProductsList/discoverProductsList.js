angular.module('xbertsApp')
  .directive('discoverProductsList', ['InviteService',function (InviteService) {
    return {
      restrict: 'E',
      scope: {
        products: '='
      },
      templateUrl: 'scripts/feature/main/discoverProductsList/discover-products-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.index = 0;
        scope.showProduct = scope.products[scope.index];
        scope.changeShowProduct = function(index) {
          scope.index = index;
          scope.showProduct = scope.products[index];
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

        scope.inviteObj = angular.copy(InviteService, {});

        scope.onToggleDown = function() {
          scope.commentToggle = !scope.commentToggle;
        };
      }
    }
  }]);
