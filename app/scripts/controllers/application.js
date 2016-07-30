'use strict';

angular.module('xbertsApp')
  .controller('ApplicationCtrl', ['$scope', '$rootScope', '$state', '$interval', 'AuthService', 'AnalyticsService',
    function($scope, $rootScope, $state, $interval, AuthService, AnalyticsService) {
      $scope.userDropdownStatus = {
        isopen: false
      };

      $scope.linkedinError = {};

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

