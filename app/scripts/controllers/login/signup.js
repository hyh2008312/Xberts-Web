'use strict';

angular.module('xbertsApp')
  .controller('SignupCtrl', ['$scope', '$rootScope', '$location', '$state', 'SystemConstant', 'SignupService',
    'AuthService', 'AnalyticsService',
    function($scope, $rootScope, $location, $state, SystemConstant, SignupService,
             AuthService, AnalyticsService) {
      $scope.countryOptions = SystemConstant.COUNTRIES;
      $scope.loginError = {};

      $scope.signup = function() {
        if (!$scope.signupForm.$valid) {
          return;
        }

        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView($location.path() + '/confirm');

        $scope.signupForm.serverError = {};

        SignupService.signup($scope.firstName, $scope.lastName, $scope.email, $scope.password, $scope.country.code)
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
