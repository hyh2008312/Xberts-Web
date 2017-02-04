'use strict';

angular.module('xbertsApp')
  .factory('Review', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/reviews/:id/', {id: '@id'}, {'patch': {method: 'PATCH'}});
  }])
  .factory('ReviewApplicants', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/reviews/:id/applicants/', {id: '@id'});
  }])
  .service('ReviewService', ['$resource', 'API_BASE_URL', '$q', '$rootScope', '$state', 'growl', function ($resource, API_BASE_URL, $q, $rootScope, $state, growl) {
    this.getSurvey = function (reviewId) {
      return $resource(API_BASE_URL + '/review/reviews/:id/', {id: reviewId}, {'patch': {method: 'PATCH'}}).get().$promise;
    };
    this.getDetail = function (reviewId) {
      return $resource(API_BASE_URL + '/review/reviewdetail/:id/', {id: '@id'}).get({id: reviewId}).$promise;
    };

    this.getList = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/', {id: '@id'}).get(params).$promise;
    };

    this.getRecommendedReviewers = function () {
      return $resource(API_BASE_URL + '/xberts/reviewers_/', {recommended: 'True'}).get().$promise;
    };

    this.getApplicantsForUser = function (reviewId, userId) {
      return $resource(API_BASE_URL + '/review/reviews/' + reviewId + '/users/' + userId + '/applicants/').get()
        .$promise;
    };

    this.applicantProtect = function (reviewId) {
      var deferred = $q.defer();

      this.getApplicantsForUser(reviewId, $rootScope.user.getUserId())
        .then(function (data) {
          if (data.count !== undefined && data.count > 0) {
            deferred.resolve(data.results[0]);
          } else {
            growl.error("Sorry, you have not been selected for this review.");
            deferred.reject(('Unable to fetch Applicantsreview'));
            $rootScope.$emit("backdropInit", 'backdropInit');
            $state.go('application.campaign', {reviewId: reviewId});
          }
        });

      return deferred.promise;
    };

    this.confirmAddress = function (applicantId) {
      return $resource(API_BASE_URL + '/review/applicants/' + applicantId + '/confirmaddress/').save().$promise;
    };
    this.exportAddress = function (reiviewId) {
      return $resource(API_BASE_URL + '/review/reviews/' + reiviewId + '/exportaddress/').save().$promise;
    };
  }]);
