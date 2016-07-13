'use strict';

angular.module('xbertsApp')
  .factory('ProjectOnlyDetail', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/projects/projectsonlydetail/:id/', {id: '@id'});
  }]);
