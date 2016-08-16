'use strict';

angular.module('xbertsApp')
  .factory('Review', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/reviews/:id/', {id: '@id'}, {'patch': {method: 'PATCH'}});
  }])
  .factory('ReviewApplicants', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/reviews/:id/applicants/', {id: '@id'});
  }])
  .service('ReviewService', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    this.getDetail = function (reviewId) {
      return $resource(API_BASE_URL + '/review/reviewdetail/:id/', {id: '@id'}).get({id: reviewId}).$promise;
    };
    this.getList = function(params){
      return $resource(API_BASE_URL + '/review/reviews/', {id: '@id'}).get(params).$promise;
    }
  }]);
