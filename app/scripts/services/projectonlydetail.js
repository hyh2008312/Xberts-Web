'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.ProjectOnlyDetail
 * @description
 * # ProjectOnlyDetail
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('ProjectOnlyDetail', ['$resource', function ($resource) {
    // Service logic
    // ...

    //var meaningOfLife = 42;

    // Public API here
    return $resource('/projects/rest/projectsonlydetail/:id/', {id: '@id'});
  }]);
