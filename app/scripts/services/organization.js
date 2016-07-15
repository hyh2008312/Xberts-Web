'use strict';

angular.module('xbertsApp')
  .factory('Organization', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/xberts/rest/organizations/:id/',
      {id: '@id'},
      {'put': {method: 'PUT'}});
  }]);
