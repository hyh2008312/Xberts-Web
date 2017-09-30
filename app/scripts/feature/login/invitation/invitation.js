angular.module('xbertsApp')
  .directive('invitation', ['$rootScope','$state','VerificationEmailService','$filter',
    function ($rootScope,$state,VerificationEmailService, $filter) {
    return {
      restrict: 'E',
      scope: {

      },
      templateUrl: 'scripts/feature/login/invitation/invitation.html',
      link: function (scope, element, attrs, ctrls) {
        scope.showBg = true;
        scope.cancel = function() {
          scope.showBg = false;
        };

      }
    }
  }]);
