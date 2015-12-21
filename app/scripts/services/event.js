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
    return $resource('/resources/events/:id/', {id: '@id'});
  }])
  .factory('EventProject', ['$resource', function ($resource) {
    return $resource('/resources/events/projects/:id/', {id: '@id'});
  }])
  .factory('EventJoin', ['$resource', function ($resource) {
    return $resource('/resources/events/joiners/:id/', {id: '@id'});
  }])
  .factory('EventProjectVote', ['$resource', function ($resource) {
    return $resource('/resources/events/projects/vote/');
  }]);
