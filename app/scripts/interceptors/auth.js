'use strict';

angular.module('xbertsApp')
  .service('AuthInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
    this.responseError = function(rejection) {
      // Ignore error when trying to test login status
      if (rejection.config.url !== '/accounts/user/' &&
          (rejection.status === 401 || rejection.status === 403)) {
        $rootScope.$broadcast('unauthorized');
      }

      return $q.reject(rejection);
    };
  }]);
