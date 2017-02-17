'use strict';

angular.module('xbertsApp')
  .factory('Review', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    return $resource(API_BASE_URL + '/review/reviews/:id/', {id: '@id'}, {'patch': {method: 'PATCH'}});
  }])
  .service('ReviewService', ['$resource', 'API_BASE_URL', '$q', '$rootScope', '$state', 'growl', function ($resource, API_BASE_URL, $q, $rootScope, $state, growl) {
    var self = this;

    /*
     * applier
     */
    var ApplierResource = $resource(
      API_BASE_URL + '/xberts/reviewers/:id/',
      {id: '@user_id'},
      {'put': {method: 'PUT'}}
    );

    self.getApplierById = function (userId) {
      return ApplierResource.get({id: userId}).$promise;
    };
    self.getCurrentApplier = function () {
      return self.getApplierById($rootScope.user.getUserId())
    };

    self.saveApplier = function (data) {
      return ApplierResource.put(data).$promise;
    };


    /*
     review
     */
    var ReviewResource = $resource(API_BASE_URL + '/review/reviews/:id/', {id: '@id'}, {'patch': {method: 'PATCH'}});

    self.getSurvey = function (reviewId) {
      return ReviewResource.get({id: reviewId}).$promise;
    };

    self.updateReview = function (data) {
      return ReviewResource.patch(data).$promise;
    };

    self.isPaidTrial = function (review) {
      return self.isFlashsale(review) || self.isDepositTrial(review)
    };
    self.isFlashsale = function (review) {
      return review.flashsale && review.flashsale.shopGatewayInventoryId !== '0';
    };
    self.isDepositTrial = function (review) {
      return review.deposit && review.deposit.shopGatewayInventoryId !== '0';
    };
    self.offPercentage = function (review) {
      if (review.flashsale) {
        var retailPrice = review.project.retailPrice.amount;
        var salePrice = review.flashsale.salePrice.amount;
        var decimal = (retailPrice - salePrice) / retailPrice;
        return Math.round(decimal * 100);
      } else {
        return 0;
      }
    };

    self.getDetail = function (reviewId) {
      return $resource(API_BASE_URL + '/review/reviewdetail/:id/', {id: '@id'}).get({id: reviewId}).$promise;
    };

    self.getList = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/', {id: '@id'}).get(params).$promise;
    };

    self.getRecommendedReviewers = function () {
      return $resource(API_BASE_URL + '/xberts/reviewers/', {recommended: 'True'}).get().$promise;
    };

    self.applicantProtect = function (reviewId) {
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
            $state.go('application.testingcampaign', {reviewId: reviewId});
          }
        });

      return deferred.promise;
    };

    self.confirmAddress = function (applicantId) {
      return $resource(API_BASE_URL + '/review/applicants/' + applicantId + '/confirmaddress/').save().$promise;
    };
    self.exportAddress = function (reiviewId) {
      return $resource(API_BASE_URL + '/review/reviews/' + reiviewId + '/exportaddress/').save().$promise;
    };

    self.getApplicants = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/:id/applicants/', {id: '@id'}).get(params).$promise;
    };
  }]);
