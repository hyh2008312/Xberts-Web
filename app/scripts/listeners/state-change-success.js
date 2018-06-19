'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', function($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if (!fromState.name && performance && dataLayer) {
        // Track initial page load time
        var now = new Date().getTime();
        var initialLoadTime = now - performance.timing.navigationStart;

        dataLayer.push({
          'event': 'initialPageLoad',
          'initialLoadTime': initialLoadTime
        });
      }

      if (fromState.name !== 'application.login' && fromState.name !== 'application.signup' &&
          fromState.name !== 'application.linkedinLogin' && fromState.name !== 'application.resetPassword.request' &&
          fromState.name !== 'application.resetPassword.sent' &&
          fromState.name !== 'application.resetPassword.confirm' &&
          fromState.name !== 'application.resetPassword.success' &&
          fromState.name !== 'application.resetPassword.error' &&
          fromState.name !== 'application.error') {
        $rootScope.previous = {
          state: fromState.name,
          params: fromParams
        };
      }
    });
  }]);
