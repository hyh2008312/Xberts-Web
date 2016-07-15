'use strict';

angular.module('xbertsApp')
  .factory('Project', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    return {
      fetch: $resource(API_BASE_URL + '/projects/projects/:id/', {id: '@id'},{'patch': {method: 'PATCH'}}),
      approve: $resource(API_BASE_URL + '/projects/projects/:id/approve/', {id: '@id'})
    };
  }]);
