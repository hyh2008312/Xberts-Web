'use strict';

angular.module('xbertsApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$state', 'AuthService',
    function($scope, $rootScope, $location, $state, AuthService) {
    $scope.login = function() {
      if (!$scope.loginForm.$valid) {
        return;
      }
      $scope.$emit('backdropOn', 'post');

      AuthService.login({username: $scope.username, password: $scope.password}, {}).auth(
        function(value, responseHeaders) {
          AuthService.postLogin(value);
        },
        function(httpResponse) {
          $scope.$emit('backdropOff', 'error');

          if (httpResponse.status === 401 || httpResponse.status === 403) {
            $scope.loginError = {invalidCredentials: true};
          } else {
            $scope.loginError = {generic: true};
          }
        });
    };
  }]);
