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

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if (!fromState.name && performance && dataLayer) {
        // Track initial page load time
        var now = new Date().getTime();
        var initialLoadTime = now - performance.timing.navigationStart;

        dataLayer.push({
          'event': 'initialPageLoad',
          'initialLoadTime': initialLoadTime,
          'initialPage': toState.name
        });
      }
    });
  }]);
