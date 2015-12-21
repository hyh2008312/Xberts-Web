'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
    $rootScope.$on('unauthorized', function() {
      $rootScope.$emit('logout', true);
    });
  }]);

