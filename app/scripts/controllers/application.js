'use strict';

angular.module('xbertsApp')
  .controller('ApplicationCtrl', ['$scope', '$rootScope', '$state', '$interval', 'AuthService',
    function($scope, $rootScope, $state, $interval, AuthService) {
      $scope.linkedinError = {};

      $scope.logout = function() {
        $rootScope.$emit('logout', true);
      };

      $scope.linkedinLogin = function() {
        $scope.$emit('backdropOn', 'post');

        AuthService.linkedinLogin();
      };
    }]);

