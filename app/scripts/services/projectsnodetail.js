'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.ProjectsNoDetail
 * @description
 * # ProjectsNoDetail
 * Service in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .service('ProjectsNoDetail', ['$resource', function ($resource) {
    // Service logic
    // ...

    //var meaningOfLife = 42;

    // Public API here
    return $resource('/projects/rest/projectsnodetail/:id/', {id: '@id'});
  }]);
