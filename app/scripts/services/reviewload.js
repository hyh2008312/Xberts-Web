'use strict';

angular.module('xbertsApp')
  .factory('ReviewLoad', ['Review', '$q', function (Review, $q) {
    return function ($stateParams) {
      var delay = $q.defer();
      Review.get({id: $stateParams.reviewId}, function (review) {
        delay.resolve(review);
      }, function () {
        delay.reject(('Unable to fetch review'));
      });
      return delay.promise;
    };
  }])
  .factory('ProjectReviewLoad', ['ProjectReview', '$q','$rootScope','$state', function (ProjectReview, $q,$rootScope,$state) {
    return function ($stateParams) {
      var delay = $q.defer();
      ProjectReview.get({id: $stateParams.reviewId}, function (review) {
        delay.resolve(review);
      }, function () {
        delay.reject(('Unable to fetch review'));
        $rootScope.$emit('backdropOff', 'off');
        $state.go('application.error');
      });
      return delay.promise;
    };
  }])
  .factory('ReviewApplicantsLoad', ['ReviewApplicants', '$q', function (ReviewApplicants, $q) {
    return function ($stateParams) {
      var delay = $q.defer();
      ReviewApplicants.get({id: $stateParams.reviewId}, function (review) {
        delay.resolve(review);
      }, function () {
        delay.reject(('Unable to fetch review'));
      });
      return delay.promise;
    };
  }]);
