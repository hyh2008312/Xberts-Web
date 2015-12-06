'use strict';

angular.module('xbertsApp')
  .factory('SignupService', ['$resource', function($resource) {
    return {
      signup: $resource('/accounts/signup/', {})
    };
  }]);
