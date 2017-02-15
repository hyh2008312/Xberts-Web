'use strict';

angular.module('xbertsApp')
  .factory('ReviewLoad', ['ReviewService', '$q', function (ReviewService, $q) {
    return function ($stateParams) {
      var delay = $q.defer();
      ReviewService
        .getSurvey($stateParams.reviewId)
        .then(function (review) {
          delay.resolve(review);
        }, function () {
          delay.reject(('Unable to fetch review'));
        });
      return delay.promise;
    };
  }]);
