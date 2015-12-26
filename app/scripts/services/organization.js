'use strict';

angular.module('xbertsApp')
  .factory('Organization', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/xberts/rest/organizations/:id/',
      {id: '@id'},
      {'put': {method: 'PUT'}});
  }]);
