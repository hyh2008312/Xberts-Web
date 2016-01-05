'use strict';

angular.module('xbertsApp')
  .factory('Project', ['$resource', 'Configuration', function($resource, Configuration) {
    return {
      fetch: $resource(Configuration.apiBaseUrl + '/projects/rest/projects/:id/', {id: '@id'}),
      approve: $resource(Configuration.apiBaseUrl + '/projects/rest/projects/:id/approve/', {id: '@id'})
    };
  }]);
