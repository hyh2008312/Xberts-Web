'use strict';

angular.module('xbertsApp')
  .factory('Review', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/reviews/:id/', {id: '@id'}, {'patch': {method: 'PATCH'}});
  }])
  .factory('ProjectReview', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/projectreviews/:id/', {id: '@id'});
  }])
  .factory('ReviewApplicants', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/reviews/:id/applicants/', {id: '@id'});
  }]);
