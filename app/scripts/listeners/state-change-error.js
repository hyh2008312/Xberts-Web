'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', '$state', 'PasswordService', function($rootScope, $state, PasswordService) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'application.resetPassword.confirm') {
        event.preventDefault();

        $rootScope.$emit('backdropOff', 'error');

        $state.go('application.resetPassword.error');
      }
    });
  }]);
