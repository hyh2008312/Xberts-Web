angular.module('xbertsApp')
  .directive('verification', ['$rootScope','$state','VerificationEmailService','$filter',
    function ($rootScope,$state,VerificationEmailService, $filter) {
    return {
      restrict: 'E',
      scope: {

      },
      templateUrl: 'scripts/feature/login/verification/verification.html',
      link: function (scope, element, attrs, ctrls) {
        scope.showBg = true;
        scope.cancel = function() {
          scope.showBg = false;
        };

        scope.showLine = true;
        scope.closeLine = function() {
          if(!$rootScope.user.getUserEmail() || !$filter('isEmail')($rootScope.user.getUserEmail())) {
            $state.go('application.protected.editProfile',{tab:'setting'});
            return;
          }
          scope.showLine = false;
          angular.element('.xb-verification').animate({height:0,minHeight:0,padding:0,overflow:'hidden'},3000);
          VerificationEmailService.activeEmail();
        };

      }
    }
  }]);
