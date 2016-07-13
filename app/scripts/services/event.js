'use strict';

angular.module('xbertsApp')
  .service('EventService', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    this.create = function (event) {
      return $resource(API_BASE_URL + '/resources/events/').save(event).$promise;
    };

    this.get = function (id) {
      return $resource(API_BASE_URL + '/resources/events/:id/').get({id: id}).$promise;
    };

    this.update = function (event) {
      return $resource(API_BASE_URL + '/resources/events/:id/', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      }).update(event).$promise;
    };
  }])
  .factory('EventProject', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/resources/events/projects/:id/', {id: '@id'});
  }])
  .factory('EventJoin', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/resources/events/joiners/:id/', {id: '@id'});
  }])
  .factory('EventProjectVote', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/resources/events/projects/votes/');
  }]);
