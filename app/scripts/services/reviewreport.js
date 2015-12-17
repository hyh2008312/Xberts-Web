'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.ReviewReport
 * @description
 * # ReviewReport
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('ReviewReport', ['$resource', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/review/reports/:id/', {id: '@id'},{'put': {method: 'PUT'}});
  }]);
