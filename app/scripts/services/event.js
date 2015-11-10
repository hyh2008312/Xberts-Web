'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.Event
 * @description
 * # Event
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .factory('Event', ['$resource', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/resources/events/:id/', {id: '@id'});
  }]);
