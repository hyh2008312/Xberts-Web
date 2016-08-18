'use strict';

angular.module('xbertsApp')
  .factory('Expert', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/xberts/experts/:id/', {id: '@id'});
  }]);
