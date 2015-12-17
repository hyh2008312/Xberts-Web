'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.ReviewReportLoad
 * @description
 * # ReviewReportLoad
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('ReviewReportLoad',  ['ReviewReport', '$q', function (ReviewReport, $q) {
    return function ($stateParams) {
      var delay = $q.defer();
      ReviewReport.get({id:$stateParams.reportId}, function (report) {
        delay.resolve(report);
      }, function () {
        delay.reject(('Unable to fetch project'));
      });
      return delay.promise;
    };
  }]);