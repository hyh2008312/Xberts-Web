'use strict';

angular.module('xbertsApp')
  .factory('Distribution', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/projects/requests/:id/', {id: '@id'}, {'put': {method: 'PUT'}});
  }])
  .factory('QuoteInquiry', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/projects/inquiry/quote/:id/', {id: '@id'});
  }]);
