'use strict';

angular.module('xbertsApp')
  .service('ProjectsNoDetail', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/projects/rest/projectsnodetail/:id/', {id: '@id'});
  }]);

