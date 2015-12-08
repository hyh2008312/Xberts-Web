'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.ProjectsNoDetail
 * @description
 * # ProjectsNoDetail
 * Service in the xbertsApp.
 */
angular.module('xbertsApp')
  .service('ProjectsNoDetail', ['$resource', function ($resource) {
    // Service logic
    // ...

    //var meaningOfLife = 42;

    // Public API here
    return $resource('/projects/rest/projectsnodetail/:id/', {id: '@id'});
  }]);
