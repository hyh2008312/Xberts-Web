'use strict';

angular.module('xbertsApp')
  .service('EventService', ['$resource', 'Configuration', function ($resource, Configuration) {
    this.create = function (event) {
      return $resource(Configuration.apiBaseUrl + '/resources/events/').save(event).$promise;
    };

    this.get = function (id) {
      return $resource(Configuration.apiBaseUrl + '/resources/events/:id/').get({id: id}).$promise;
    };

    this.update = function (event) {
      return $resource(Configuration.apiBaseUrl + '/resources/events/:id/', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      }).update(event).$promise;
    };
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
