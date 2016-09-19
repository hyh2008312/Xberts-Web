'use strict';

angular.module('xbertsApp')
  .factory('ApplicantsreviewLoad', ['$rootScope', 'ReviewService', 'growl', '$state', '$q',
    function ($rootScope, ReviewService, growl, $state, $q) {
      return function ($stateParams) {
        var deferred = $q.defer();

        ReviewService.getApplicantsForUser($stateParams.reviewId, $rootScope.user.getUserId())
          .then(function (data) {
            if (data.count !== undefined && data.count > 0) {
              deferred.resolve(data.results[0]);
            } else {
              growl.error("Sorry, you have not been selected for this review.");
              deferred.reject(('Unable to fetch Applicantsreview'));
              $rootScope.$emit("backdropInit",'backdropInit');
              $state.go('application.campaign', {reviewId: $stateParams.reviewId});
            }
          });

        return deferred.promise;
      };
    }]);
