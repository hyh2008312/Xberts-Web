'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.applicantsreviewLoad
 * @description
 * # applicantsreviewLoad
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('ApplicantsreviewLoad', ['Applicantsreview', '$q', function (Applicantsreview, $q) {
    return function ($stateParams) {
      var delay = $q.defer();
      Applicantsreview.get({id:$stateParams.reviewApplicantId}, function (report) {
        delay.resolve(report);
      }, function () {
        delay.reject(('Unable to fetch Applicantsreview'));
      });
      return delay.promise;
    };
  }]);
