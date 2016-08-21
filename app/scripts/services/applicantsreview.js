'use strict';

angular.module('xbertsApp')
  .factory('Applicantsreview', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/applicantsreview/:id/', {id: '@id'});
  }])
  .factory('Applicantsreview', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
  return $resource(API_BASE_URL + '/review/applicantsreview/:id/', {id: '@id'});
}]);
