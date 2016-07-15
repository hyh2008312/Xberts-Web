'use strict';

angular.module('xbertsApp')
  .factory('EventNoDetail', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/resources/eventsnodetail/:id/', {id: '@id'});
  }]);
