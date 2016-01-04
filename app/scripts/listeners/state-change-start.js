'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', 'UserResolver', function($rootScope, UserResolver) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      $rootScope.next = {
        state: toState,
        params: toParams
      };

      if ($rootScope.user.isResolved()) {
        UserResolver.resolver();
      }
    });
  }]);
