'use strict';

angular.module('xbertsApp')
  .factory('Sales', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/sales/flashsales/:saleId/', {id: '@id'});
  }]);
