'use strict';

angular.module('xbertsApp')
  .controller('ApplicationCtrl', ['$scope', '$rootScope', '$state', '$interval', 'AuthService', 'AnalyticsService',
    function($scope, $rootScope, $state, $interval, AuthService, AnalyticsService) {
      $scope.userDropdownStatus = {
        isopen: false
      };

      $scope.linkedinError = {};

      $scope.errorCheck = function(form, field) {
        if ((form.$submitted || form[field].$touched) && form[field].$invalid) {
          return true;
        } else {
          return false;
        }
      };

      $scope.logout = function() {
        $scope.userDropdownStatus = false;

        AnalyticsService.sendPageView('/logout');

        $rootScope.$emit('logout', true);
      };

      $scope.linkedinLogin = function() {
        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView('/linkedinlogin');

        AuthService.linkedinLogin();
      };

      $scope.facebookLogin = function(loginError) {
        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView('/facebooklogin');

        AuthService.facebookLogin()
          .then(function (response) {
            AuthService.loginRedirect();
          })
          .catch(function (response) {
            $scope.$emit('backdropOff', 'error');

            if (response === 'missing_permission') {
              loginError.facebookPermissionError = true;
            } else {
              loginError.facebookError = true;
            }
          });
      };
    }]);
