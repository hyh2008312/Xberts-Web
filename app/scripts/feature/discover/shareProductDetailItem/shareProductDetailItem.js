angular.module('xbertsApp')
  .directive('shareProductDetailItem', ['InviteService','BrowserUtil',function (InviteService,BrowserUtil) {
    return {
      restrict: 'E',
      scope: {
        product: '='
      },
      templateUrl: 'scripts/feature/discover/shareProductDetailItem/share-product-detail-item.html',
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

        scope.isFacebookApp = BrowserUtil.isFacebookApp();

        scope.inviteObj = angular.copy(InviteService, {});
      }
    }
  }]);
