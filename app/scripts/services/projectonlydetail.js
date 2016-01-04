'use strict';

angular.module('xbertsApp')
  .factory('ProjectOnlyDetail', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/projects/rest/projectsonlydetail/:id/', {id: '@id'});
  }]);
