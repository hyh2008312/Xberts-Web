'use strict';

angular.module('xbertsApp')
  .factory('ApplicantsreviewLoad', ['$rootScope', 'Applicantsreview', 'growl', '$state', '$q',
    function ($rootScope, Applicantsreview, growl, $state, $q) {
      return function ($stateParams) {
        var delay = $q.defer();
        Applicantsreview.get({
          review_id: $stateParams.reviewId,
          reviewer_id: $rootScope.user.getUserId()
        }, function (data) {
          if (data.count !== undefined && data.count > 0) {
            delay.resolve(data.results[0]);
          } else {
            growl.error("Sorry, you have not been selected for this review.");
            delay.reject(('Unable to fetch Applicantsreview'));
            $rootScope.$emit("backdropInit",'backdropInit');
            $state.go('application.crowdtesting', {reviewId: $stateParams.reviewId});
          }
        }, function () {
          growl.error("Sorry, you have not been selected for this review.");
          delay.reject(('Unable to fetch Applicantsreview'));
          $rootScope.$emit("backdropInit",'backdropInit');
          $state.go('application.crowdtesting', {reviewId: $stateParams.reviewId})
        });
        return delay.promise;
      };
    }]);
