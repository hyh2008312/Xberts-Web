'use strict';

angular.module('xbertsApp')
  .factory('Project', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/projects/rest/projects/:id/', {id: '@id'});
  }]);
