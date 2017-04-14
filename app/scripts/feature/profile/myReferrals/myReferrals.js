angular.module('xbertsApp')
  .directive('myReferrals', ['$rootScope','$uibModal',function($rootScope,$uibModal) {
    return {
      restrict: 'E',
      scope: {
        referrals : '='
      },
      templateUrl: 'scripts/feature/profile/myReferrals/my-referrals.html',
      link: function (scope, element, attrs, ctrls) {
        scope.contactUser = function (id) {
          if (!$rootScope.user.authRequired()) {
            return;
          }

          var sendMessageModal = $uibModal.open({
            templateUrl: 'views/modal/send-message.html',
            windowClass: 'dialog-vertical-center',
            controller: 'SendMessageCtrl',
            resolve: {
              recipientId: function () {
                return id;
              }
            }
          });
        };
      }
    }
  }]);
