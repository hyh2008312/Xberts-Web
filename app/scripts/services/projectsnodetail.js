'use strict';

angular.module('xbertsApp')
  .service('ProjectsNoDetail', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/projects/projectsnodetail/:id/', {id: '@id'});
  }]);

