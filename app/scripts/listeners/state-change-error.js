'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();

      if (toState.name === 'application.resetPassword.confirm') {
        $state.go('application.resetPassword.error');
      } else {
        $state.go('application.error');
      }
    });
  }]);
