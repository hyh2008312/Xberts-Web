'use strict';

angular.module('xbertsApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$state', '$stateParams', 'Configuration',
    'AuthService', 'AnalyticsService',
    function($scope, $rootScope, $location, $state, $stateParams, Configuration,
             AuthService, AnalyticsService) {
      if ($stateParams.error === 'linkedin_login') {
        $scope.loginError = {linkedinError: true};

        $location.search('error', null);
      } else {
        $scope.loginError = {};
      }

      $scope.login = function(form) {
        if (!$scope.loginForm.$valid) {
          return;
        }
        $scope.$emit('backdropOn', 'post');

        AnalyticsService.sendPageView($location.path() + '/confirm');

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
