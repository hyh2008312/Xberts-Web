'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', '$state', 'S', function($rootScope, $state, S) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
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
