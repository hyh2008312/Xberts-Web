'use strict';

angular.module('xbertsApp')
  .factory('Event', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/resources/events/:id/', {id: '@id'});
  }])
  .factory('EventProject', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/resources/events/projects/:id/', {id: '@id'});
  }])
  .factory('EventJoin', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/resources/events/joiners/:id/', {id: '@id'});
  }])
  .factory('EventProjectVote', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/resources/events/projects/votes/');
  }]);
