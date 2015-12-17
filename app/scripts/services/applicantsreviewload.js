'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.applicantsreviewLoad
 * @description
 * # applicantsreviewLoad
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('ApplicantsreviewLoad', ['$rootscope', 'Applicantsreview', '$q', function ($rootscope, Applicantsreview, $q) {
    return function ($stateParams) {
      var delay = $q.defer();
      Applicantsreview.get({
        review_id: $stateParams.reviewId,
        reviewer_id: $rootscope.user.getUserId()
      }, function (data) {
        if (data.count !== undefined && data.count > 0) {
          delay.resolve(data.results[0]);
        }else {
          delay.reject(('Unable to fetch Applicantsreview'));
        }
      }, function () {
        delay.reject(('Unable to fetch Applicantsreview'));
      });
      return delay.promise;
    };
  }]);
