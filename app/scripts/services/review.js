'use strict';

angular.module('xbertsApp')
  .factory('Review', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/review/reviews/:id/', {id: '@id'}, {'patch': {method: 'PATCH'}});
  }])
  .factory('ProjectReview', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/review/projectreviews/:id/', {id: '@id'});
  }])
  .factory('ReviewApplicants', ['$resource', 'Configuration', function ($resource, Configuration) {
    return $resource(Configuration.apiBaseUrl + '/review/reviews/:id/applicants/', {id: '@id'});
  }]);
