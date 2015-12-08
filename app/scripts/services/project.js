'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.project
 * @description
 * # project
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('Project', ['$resource', function ($resource) {
    // Service logic
    // ...

    //var meaningOfLife = 42;

    // Public API here
    return $resource('/projects/rest/projects/:id/', {id: '@id'});
  }])
;
