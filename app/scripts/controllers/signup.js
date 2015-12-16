'use strict';

angular.module('xbertsApp')
  .controller('SignupCtrl', ['$scope', '$location', 'SystemConstant', 'SignupService', 'AuthService',
    function($scope, $location, SystemConstant, SignupService, AuthService) {
    $scope.countryOptions = SystemConstant.COUNTRIES;

    $scope.signup = function() {
      if (!$scope.signupForm.$valid) {
        return;
      }

      $scope.$emit('backdropOn', 'post');

      $scope.signupForm.serverError = {};

      SignupService.signup.save({
        fullName: $scope.fullName,
        email: $scope.email,
        password: $scope.password,
        country: $scope.country.code
      }, function(value, responseHeader) {
        AuthService.setUser(value);

        $scope.$emit('backdropOff', 'success');

        window.location.href = '/auth/home/';
      }, function(httpResponse) {
        $scope.$emit('backdropOff', 'error');

        if (httpResponse.status === 409) {
          $scope.signupForm.serverError.userExist = true;
        } else {
          $scope.signupForm.serverError.generic = true;
        }
      });
    };
  }]);
