'use strict';

angular.module('xbertsApp')
  .factory('Applicantsreview', ['$resource', 'Configuration', function($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/review/applicantsreview/:id/', {id: '@id'});
  }]);
