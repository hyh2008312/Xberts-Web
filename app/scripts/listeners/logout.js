'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
    $rootScope.$on('logout', function(shouldMakeApiCall) {
      $rootScope.$emit('backdropOn', 'delete');

      AuthService.logout(shouldMakeApiCall)
        .then(function(response) {
          $rootScope.$emit('backdropOff', 'success');

          $state.go('application.login');
        })
        .catch(function(response) {
          $rootScope.$emit('backdropOff', 'error');

          $state.go('application.login');
        });
    });
  }]);


