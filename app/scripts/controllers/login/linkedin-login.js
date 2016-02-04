'use strict';

angular.module('xbertsApp')
  .controller('LinkedinLoginCtrl', ['$scope', '$location', '$state', 'localStorageService', 'Configuration', 'AuthService',
    function($scope, $location, $state, localStorageService, Configuration, AuthService) {
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
            return AuthService.exchangeLinkedinToken(value.access_token);
          })
          .then(function(value) {
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

