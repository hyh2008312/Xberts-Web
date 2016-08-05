'use strict';

angular.module('xbertsApp')
  .controller('LinkedinLoginCtrl', ['$scope', '$rootScope', '$location', '$state', 'localStorageService', 'Configuration', 'AuthService',
    function($scope, $rootScope, $location, $state, localStorageService, Configuration, AuthService) {
      $scope.$emit('backdropOn', 'post');

      var params = $location.search();
      var verified = false;

      if ('code' in params) {
        if (localStorageService.cookie.isSupported) {
          if (localStorageService.cookie.get(Configuration.linkedinStateStorageKey) &&
              localStorageService.cookie.get(Configuration.linkedinStateStorageKey) === params.state) {
            verified = true;
          }
        } else {
          if (Configuration.linkedinDefaultState=== params.state) {
            verified = true;
          }
        }
      }

      if (verified) {
        AuthService.getLinkedinToken(params.code)
          .then(function(value) {
            return AuthService.exchangeToken(value.access_token, 'linkedin-oauth2');
          })
          .then(function(value) {
            if (localStorageService.cookie.get(Configuration.postLoginStateStorageKey)) {
              $rootScope.postLoginState = localStorageService.cookie.get(Configuration.postLoginStateStorageKey);
              localStorageService.cookie.remove(Configuration.postLoginStateStorageKey);
            }
            AuthService.loginRedirect();
          })
          .catch(function(response) {
            handleError();
          });
      } else {
        handleError();
      }

      function handleError() {
        $scope.$emit('backdropOff', 'error');

        $state.go('application.login', {error: 'linkedin_login'}, {location: 'replace'});
      }
  }]);

