'use strict';

angular.module('xbertsApp')
  .factory('Review', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/review/reviews/:id/', {id: '@id'});
  }]);
