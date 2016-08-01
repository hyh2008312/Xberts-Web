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
        AnalyticsService.sendPageView('/logout');

        $rootScope.$emit('logout', true);
      };

      $scope.linkedinLogin = function() {
        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView('/linkedinlogin');

        AuthService.linkedinLogin();
      };
    }]);

