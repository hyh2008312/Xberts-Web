angular.module('xbertsApp')
  .directive('shareProductItem', ['InviteService',function (InviteService) {
    return {
      restrict: 'E',
      scope: {
        product: '='
      },
      templateUrl: 'scripts/feature/discover/shareProductItem/share-product-item.html',
      link: function (scope, element, attrs, ctrls) {
        scope.product = scope.product || {};
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

        scope.inviteObj = angular.copy(InviteService, {});

        scope.commentToggle = false;

        scope.onToggleDown = function() {
          scope.commentToggle = !scope.commentToggle;
        };

      }
    }
  }]);
