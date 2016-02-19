'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', function($rootScope) {
    $rootScope.$on('unauthorized', function() {
      // Make sure there is no hanging spinner due to interrupted transition
      $rootScope.$emit('backdropInit', 'onUnauthorizedEvent');
      $rootScope.$emit('logout', false);
    });
  }]);

