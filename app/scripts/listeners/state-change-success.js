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
          'initialLoadTime': initialLoadTime,
          'initialPage': toState.name
        });
      }
    });
  }]);
