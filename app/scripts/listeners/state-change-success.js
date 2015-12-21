'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', '$state', 'S', function($rootScope, $state, S) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      // Checking auth status on stateChangeSuccess instead of stateChangeStart to make sure authCheck resolver
      // has been executed before this check.
      if (S(toState.name).startsWith('application.protected') && !$rootScope.user.isAuth()) {
        event.preventDefault();

        $rootScope.next = {
          state: toState,
          params: toParams
        };

        $rootScope.$emit('backdropOff', 'login');

        $state.go('application.login');
      }
    });
  }]);
