'use strict';

angular.module('xbertsApp')
  .factory('Review', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/reviews/:id/', {id: '@id'}, {'patch': {method: 'PATCH'}});
  }])
  .service('ReviewService', ['$resource', 'API_BASE_URL', '$q', '$rootScope', '$state', 'growl', function ($resource, API_BASE_URL, $q, $rootScope, $state, growl) {
    var review = this;

      /*
       * applier
       */
    var ApplierResource = $resource(API_BASE_URL + '/xberts/reviewers/:id/',{id: '@user_id'},{'put': {method: 'PUT'}});

    review.getApplierById = function (userId) {
      return ApplierResource.get({id: userId}).$promise;
    };
    review.getCurrentApplier = function () {
      return review.getApplierById($rootScope.user.getUserId())
    };

    review.saveApplier = function (data) {
      return ApplierResource.put(data).$promise;
    };


      /*
       review
       */
    review.getSurvey = function (reviewId) {
      return $resource(API_BASE_URL + '/review/reviews/:id/', {id: reviewId}, {'patch': {method: 'PATCH'}}).get().$promise;
    };
    review.getDetail = function (reviewId) {
      return $resource(API_BASE_URL + '/review/reviewdetail/:id/', {id: '@id'}).get({id: reviewId}).$promise;
    };

    review.getList = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/', {id: '@id'}).get(params).$promise;
    };

    review.getRecommendedReviewers = function () {
      return $resource(API_BASE_URL + '/xberts/reviewers/', {recommended: 'True'}).get().$promise;
    };

    review.applicantProtect = function (reviewId) {
      var deferred = $q.defer();

      var userId = $rootScope.user.getUserId();

      $resource(API_BASE_URL + '/review/reviews/' + reviewId + '/users/' + userId + '/applicants/')
        .get()
        .$promise
        .then(function (data) {
          if (data.count !== undefined && data.count > 0) {
            deferred.resolve(data.results[0]);
          } else {
            growl.error("Sorry, you have not been selected for review.");
            deferred.reject(('you have not been selected for review.'));
            $rootScope.$emit("backdropInit", 'backdropInit');
            $state.go('application.campaign', {reviewId: reviewId});
          }
        });

      return deferred.promise;
    };

    review.confirmAddress = function (applicantId) {
      return $resource(API_BASE_URL + '/review/applicants/' + applicantId + '/confirmaddress/').save().$promise;
    };
    review.exportAddress = function (reiviewId) {
      return $resource(API_BASE_URL + '/review/reviews/' + reiviewId + '/exportaddress/').save().$promise;
    };

    review.getApplicants = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/:id/applicants/', {id: '@id'}).get(params).$promise;
    };
  }]);
