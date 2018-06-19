angular.module('xbertsApp')
  .directive('invitation', ['$rootScope','$state','VerificationEmailService',
    function ($rootScope,$state,VerificationEmailService) {
    return {
      restrict: 'E',
      scope: {

      },
      templateUrl: 'scripts/feature/login/invitation/invitation.html',
      link: function (scope, element, attrs, ctrls) {
        scope.showBg = VerificationEmailService.emailSend;
        scope.cancel = function() {

          scope.showBg = !scope.showBg;
          VerificationEmailService.emailSend = scope.showBg;
        };

      }
    }
  }]);
