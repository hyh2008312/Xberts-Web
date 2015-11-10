'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.project
 * @description
 * # project
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('Project', ['$resource', function ($resource) {
    // Service logic
    // ...

    //var meaningOfLife = 42;

    // Public API here
    return $resource('/projects/rest/projects/:id/', {id: '@id'});
  }])
;
