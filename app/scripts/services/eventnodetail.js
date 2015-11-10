'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.EventNoDetail
 * @description
 * # EventNoDetail
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('EventNoDetail', ['$resource', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/resources/eventsnodetail/:id/', {id: '@id'});
  }]);
