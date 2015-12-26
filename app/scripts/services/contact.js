'use strict';

angular.module('xbertsApp')
  .factory('Contact', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/resources/contacts/:id/', {id: '@id'});
  }]);
