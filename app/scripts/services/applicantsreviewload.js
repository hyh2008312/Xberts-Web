'use strict';

angular.module('xbertsApp')
  .factory('ApplicantsreviewLoad', ['$rootScope', 'Applicantsreview','growl', '$q',
    function ($rootScope, Applicantsreview,growl, $q) {
    return function ($stateParams) {
      var delay = $q.defer();
      Applicantsreview.get({
        review_id: $stateParams.reviewId,
        reviewer_id: $rootScope.user.getUserId()
      }, function (data) {
        if (data.count !== undefined && data.count > 0) {
          delay.resolve(data.results[0]);
        }else {
          growl.error("You didn't apply the review");
          delay.reject(('Unable to fetch Applicantsreview'));
        }
      }, function () {
        growl.error("You didn't apply the review");
        delay.reject(('Unable to fetch Applicantsreview'));
      });
      return delay.promise;
    };
  }]);
