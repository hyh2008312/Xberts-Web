angular.module('xbertsApp')
  .controller('RedeemDetailCtrl', ['$rootScope', '$mdDialog', '$mdToast', '$rootScope', 'redeemDetail', function($rootScope, $mdDialog, $mdToast, $rootScope, redeemDetail) {
    var redeemCtrl = this;
    redeemCtrl.redeemDetail = redeemDetail;

    redeemCtrl.toggle = false;

    redeemCtrl.showDescription = function() {
      redeemCtrl.toggle = !redeemCtrl.toggle;
    };

    redeemCtrl.redeem = function(ev) {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('.xb-body-view')))
          .clickOutsideToClose(true)
          .textContent("Oops! You don't have enough points to redeem this gift. Earn more points now!")
          .ariaLabel('Alert Dialog')
          .ok('ok')
          .targetEvent(ev)
      );
    };
    redeemCtrl.redeemMobile = function(ev) {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      $mdToast.show({
        hideDelay: 10000000,
        position: 'bottom',
        controller: function(scope, $mdToast) {
          scope.cancel = function() {
            $mdToast.cancel();
          };
        },
        toastClass:'xb-redeem-detail__toast',
        templateUrl: 'scripts/feature/credit/redeemToast/redeem-toast.html'
      });
    };

    var title = redeemDetail.name;
    var description = redeemDetail.description;
    var backgroundColor = 'background-bg-light';
    var shareImage = redeemDetail.getImageOriginal();
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);



