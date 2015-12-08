'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.Distributor
 * @description
 * # Distributor
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('Distributor', ['$resource', function ($resource) {
    // Service logic
    // ...

    // Public API here
    return $resource('/projects/rest/distributors/:id/', {id: '@id'});
  }]);
