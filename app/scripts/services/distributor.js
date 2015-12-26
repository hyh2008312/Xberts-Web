'use strict';

angular.module('xbertsApp')
  .factory('Distributor', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/projects/rest/distributors/:id/', {id: '@id'});
  }]);
