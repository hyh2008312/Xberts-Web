'use strict';

angular.module('xbertsApp')
  .service('AuthInterceptor', ['$q', '$rootScope', 'S', 'Configuration', function($q, $rootScope, S, Configuration) {
    this.responseError = function(response) {
      var shouldIgnore = false;

      angular.forEach(Configuration.unauthorizedExceptionEndpoints, function(value) {
        if (S(response.config.url).endsWith(value)) {
          shouldIgnore = true;
        }
      });

      if (!shouldIgnore && (response.status === 401 || response.status === 403)) {
        $rootScope.$broadcast('unauthorized');
      }

      return $q.reject(response);
    };
  }]);
