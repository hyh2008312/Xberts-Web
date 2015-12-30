'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.ReviewLoad
 * @description
 * # ReviewLoad
 * Factory in the xbertsApp.
 */
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
  .factory('ProjectReviewLoad', ['ProjectReview', '$q', function (ProjectReview, $q) {
    return function ($stateParams) {
      var delay = $q.defer();
      ProjectReview.get({id: $stateParams.reviewId}, function (review) {
        delay.resolve(review);
      }, function () {
        delay.reject(('Unable to fetch review'));
      });
      return delay.promise;
    };
  }]);
