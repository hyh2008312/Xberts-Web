'use strict';

angular.module('xbertsApp')
  .service('ProjectsNoDetail', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/projects/projectsnodetail/:id/', {id: '@id'});
  }]);

