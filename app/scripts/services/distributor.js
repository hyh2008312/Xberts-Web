'use strict';

angular.module('xbertsApp')
  .factory('Distributor', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/projects/distributors/:id/', {id: '@id'});
  }]);
