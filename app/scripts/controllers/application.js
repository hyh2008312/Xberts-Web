'use strict';

angular.module('xbertsApp')
  .controller('ApplicationCtrl', ['$scope', '$rootScope', '$state', '$auth', 'AuthService',
    function($scope, $rootScope, $state, $auth, AuthService) {
      $scope.linkedinError = {};

      $scope.logout = function() {
        $rootScope.$emit('logout', true);
      };

      $scope.linkedinLogin = function() {
        $scope.linkedinError = {};

        $auth.authenticate('linkedin')
          .then(function(response) {
            $scope.$emit('backdropOn', 'post');

            return AuthService.exchangeLinkedinToken(response.data.access_token);
          })
          .then(function(value) {
            AuthService.loginRedirect();
          })
          .catch(function(response) {
            $scope.$emit('backdropOff', 'error');

            $scope.linkedinError.generic = true;
          });
      };
    }]);

