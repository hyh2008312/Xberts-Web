'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.Distributor
 * @description
 * # Distributor
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('Distributor', ['$resource', function ($resource) {
    // Service logic
    // ...

    // Public API here
    return $resource('/projects/rest/distributors/:id/', {id: '@id'});
  }]);
