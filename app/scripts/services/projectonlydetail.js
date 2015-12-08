'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.ProjectOnlyDetail
 * @description
 * # ProjectOnlyDetail
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('ProjectOnlyDetail', ['$resource', function ($resource) {
    // Service logic
    // ...

    //var meaningOfLife = 42;

    // Public API here
    return $resource('/projects/rest/projectsonlydetail/:id/', {id: '@id'});
  }]);
