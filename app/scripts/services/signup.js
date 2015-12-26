'use strict';

angular.module('xbertsApp')
  .factory('SignupService', ['$resource', 'Configuration', function($resource, Configuration) {
    return {
      signup: $resource(Configuration.apiBaseUrl + '/accounts/signup/', {})
    };
  }]);
