'use strict';

angular.module('xbertsApp')
  .factory('ReviewReport', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/review/reports/:id/', {id: '@id'}, {'put': {method: 'PUT'}});
  }])
  .factory('ReviewReportMore', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/review/reports/:id/more', {id: '@id'});
  }]);
