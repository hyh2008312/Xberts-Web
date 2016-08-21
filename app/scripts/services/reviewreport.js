'use strict';

angular.module('xbertsApp')
  .factory('ReviewReport', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/reviews/:reviewId/reports/:id/', {id: '@id'}, {
      'put': {method: 'PUT'},
      'patch': {method: 'PATCH'}

    });
  }])
  .factory('AllReport', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/reviews/reports/');
  }]);
