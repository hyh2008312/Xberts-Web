'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.EventNoDetail
 * @description
 * # EventNoDetail
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('EventNoDetail', ['$resource', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/resources/eventsnodetail/:id/', {id: '@id'});
  }]);
