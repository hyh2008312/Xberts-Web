angular.module('xbertsApp')
  .directive('shareProductDetailItem', ['InviteService','BrowserUtil',function (InviteService,BrowserUtil) {
    return {
      restrict: 'E',
      scope: {
        product: '=',
        popupOpen: '='
      },
      templateUrl: 'scripts/feature/discover/shareProductDetailItem/share-product-detail-item.html',
      link: function (scope, element, attrs, ctrls) {

        scope.product.tags = scope.product.tags ? scope.product.tags.split(','): [];

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

        scope.isFacebookApp = BrowserUtil.isFacebookApp();

        scope.inviteObj = angular.copy(InviteService, {});

        scope.commentToggle = false;

        scope.onToggleDown = function() {
          scope.commentToggle = !scope.commentToggle;
        };
      }
    }
  }]);
