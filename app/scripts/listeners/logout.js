'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
    $rootScope.$on('logout', function(event, shouldMakeApiCall) {
      $rootScope.$emit('backdropOn', 'delete');

      AuthService.logout(shouldMakeApiCall)
        .then(function(response) {
          $rootScope.$emit('backdropOff', 'success');

          $state.go('application.main');
        })
        .catch(function(response) {
          $rootScope.$emit('backdropOff', 'error');

          $state.go('application.main');
        });
    });
  }]);


