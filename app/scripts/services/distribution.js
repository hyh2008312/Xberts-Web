'use strict';

angular.module('xbertsApp')
  .factory('Distribution', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/projects/rest/requests/:id/', {id: '@id'},{'put': {method: 'PUT'}});
  }]);
