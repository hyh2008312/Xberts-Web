'use strict';

angular.module('xbertsApp')
  .factory('Expert', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/xberts/rest/experts/:id/', {id: '@id'});
  }]);
