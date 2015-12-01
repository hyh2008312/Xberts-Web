'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.Event
 * @description
 * # Event
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('Event', ['$resource', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/resources/events/:id/', {id: '@id'});
  }]);
