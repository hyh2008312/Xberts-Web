'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
    $rootScope.$on('unauthorized', function() {
      // Make sure there is no hanging spinner due to interrupted transition
      $rootScope.$emit('backdropInit', 'onUnauthorizedEvent');
      $rootScope.$emit('logout', false);
    });
  }]);

