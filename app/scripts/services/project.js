'use strict';

angular.module('xbertsApp')
  .factory('Project', ['$resource', 'Configuration', function($resource, Configuration) {
    return {
      fetch: $resource(Configuration.apiBaseUrl + '/projects/projects/:id/', {id: '@id'},{'patch': {method: 'PATCH'}}),
      approve: $resource(Configuration.apiBaseUrl + '/projects/projects/:id/approve/', {id: '@id'})
    };
  }]);
