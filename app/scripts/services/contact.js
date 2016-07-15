'use strict';

angular.module('xbertsApp')
  .factory('Contact', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/resources/contacts/:id/', {id: '@id'});
  }]);
