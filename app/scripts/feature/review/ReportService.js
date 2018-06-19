'use strict';

angular.module('xbertsApp')
  .factory('ReviewReport', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/reviews/:reviewId/reports/:id/', {id: '@id'}, {
      'put': {method: 'PUT'},
      'patch': {method: 'PATCH'}

    });
  }])
  .service('ReportService', ['$resource', 'API_BASE_URL','Report', function ($resource, API_BASE_URL,Report) {
    var self = this;
    var ReportResource = $resource(API_BASE_URL + '/review/reports/:id/');
    self.getList = function (params) {
      return ReportResource.get(params).$promise;
    };
    self.getReport = function (id) {
      return ReportResource.get({id: id}).$promise.then(Report.build);
    }
  }]);
