'use strict';

angular.module('xbertsApp')
  .service('ReviewService', ['$resource', 'API_BASE_URL', '$q', '$rootScope', '$state', 'growl', 'Review', 'Report',
    'MainModel',
    function ($resource, API_BASE_URL, $q, $rootScope, $state, growl, Review, Report,MainModel) {
    var self = this;

    var ReviewResource = $resource(API_BASE_URL + '/review/reviews/:id/', {id: '@id'}, {'patch': {method: 'PATCH'}});

    self.getSurvey = function (reviewId) {
      return ReviewResource.get({id: reviewId}).$promise.then(Review.build);
    };

    self.updateReview = function (data) {
      return ReviewResource.patch(data).$promise;
    };

    self.getDetail = function (reviewId) {
      return $resource(API_BASE_URL + '/review/reviewdetail/:id/', {id: '@id'}).get({id: reviewId}).$promise.then(Review.build);
    };

    self.getList = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/', {id: '@id'}).get(params).$promise;
    };

    self.getRecommendedReviewers = function (params) {
      return $resource(API_BASE_URL + '/xberts/reviewers/', params).get().$promise;
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

    self.exportAddress = function (reiviewId) {
      return $resource(API_BASE_URL + '/review/reviews/' + reiviewId + '/exportaddress/').save().$promise;
    };

    self.getApplicants = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/:id/applicants/', {id: '@id'}).get(params).$promise.then(Review.buildPageList);
    };

    self.getReporters = function (params) {
      return $resource(API_BASE_URL + '/review/reviews/:id/reports/').get(params).$promise.then(Report.buildPageList);
    };

    self.checkIsApplicant = function(params) {
      return $resource(API_BASE_URL + '/review/applicants/').get(params).$promise.then(Review.buildPageList);
    };

    this.getArticleList = function (params) {
      return $resource(API_BASE_URL + '/articles/').get(params).$promise.then(MainModel.buildPageList);
    };

    self.postBlog = function(params) {
      return $resource(API_BASE_URL + '/blogs/').save(params).$promise;
    };

    self.getBlogDetail = function (reviewId) {
      return $resource(API_BASE_URL + '/blogs/:id/',{id:'@id'}).get({id:reviewId}).$promise.then(MainModel.build);
    };
  }]);
