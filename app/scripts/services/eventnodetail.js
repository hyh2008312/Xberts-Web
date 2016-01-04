'use strict';

angular.module('xbertsApp')
  .factory('EventNoDetail', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/resources/eventsnodetail/:id/', {id: '@id'});
  }]);
