'use strict';

angular.module('xbertsApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$state', '$auth', 'Configuration', 'AuthService',
    function($scope, $rootScope, $location, $state, $auth, Configuration, AuthService) {
      $scope.login = function(form) {
        if (!$scope.loginForm.$valid) {
          return;
        }
        $scope.$emit('backdropOn', 'post');

        form.serverError = {};

        AuthService.login({username: $scope.username, password: $scope.password})
          .then(function(value) {
            AuthService.loginRedirect();
          })
          .catch(
            function(httpResponse) {
              $scope.$emit('backdropOff', 'error');

              if (httpResponse.status === 401 || httpResponse.status === 403) {
                form.serverError = {invalidCredentials: true};
              } else if (httpResponse.status === 400 && httpResponse.data.error === 'linkedin_signup') {
                form.serverError = {linkedinSignup: true};
              } else {
                form.serverError = {generic: true};
              }
            });
      };
    }]);
