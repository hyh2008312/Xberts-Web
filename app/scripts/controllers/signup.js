'use strict';

angular.module('xbertsApp')
  .controller('SignupCtrl', ['$scope', '$rootScope', '$location', '$state', 'SystemConstant', 'SignupService', 'AuthService',
    function($scope, $rootScope, $location, $state, SystemConstant, SignupService, AuthService) {
    $scope.countryOptions = SystemConstant.COUNTRIES;

    $scope.signup = function() {
      if (!$scope.signupForm.$valid) {
        return;
      }

      $scope.$emit('backdropOn', 'post');

      $scope.signupForm.serverError = {};

      SignupService.signup.save({
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        email: $scope.email,
        password: $scope.password,
        country: $scope.country.code
      }).$promise
        .then(function(value) {
          return AuthService.login({
            username: value.email,
            password: $scope.password
          });
        })
        .then(function(value) {
          AuthService.loginRedirect();
        })
        .catch(function(httpResponse) {
          $scope.$emit('backdropOff', 'error');

          if (httpResponse.status === 409) {
            $scope.signupForm.serverError.userExist = true;
          } else {
            $scope.signupForm.serverError.generic = true;
          }
        });
    };
  }]);
