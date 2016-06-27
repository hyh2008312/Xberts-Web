'use strict';

angular.module('xbertsApp')
  .factory('Sales', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/sales/flashsales/:saleId/', {id: '@id'});
  }]);
