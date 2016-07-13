'use strict';

angular.module('xbertsApp')
  .factory('Distributor', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/projects/distributors/:id/', {id: '@id'});
  }]);
