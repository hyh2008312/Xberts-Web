'use strict';

angular.module('xbertsApp')
  .service('ApplicationService', ['$resource', 'API_BASE_URL', '$q', '$rootScope', '$state', 'growl', function ($resource, API_BASE_URL, $q, $rootScope, $state, growl) {
    var self = this;
    var ApplicationResource = $resource(API_BASE_URL + '/review/applicants/:id/', {id: '@id'}, {
      'put': {method: 'PUT'},
      'patch': {method: 'PATCH'}
    });

    self.getApplications = function (params) {
      return $resource(API_BASE_URL + '/review/application/').get(params).$promise;
    };
    /*
     return applicants with review info, search field 'reviewer_id', 'review_id','review__review_type'
     */
    self.getApplicationsWithReview = function (params) {
      return $resource(API_BASE_URL + '/review/applicantsreview/').get(params).$promise;
    };


    /*
      applicant instance operations
    */

    self.saveApplication = function (data) {
      if(data.id){
        return ApplicationResource.patch(data).$promise;
      }else{
        return ApplicationResource.save(data).$promise;
      }
    };

    self.getApplicationForReviewID = function (reviewId) {
      var delay = $q.defer();
      ApplicationResource.get({
        review_id: reviewId,
        reviewer_id: $rootScope.user.getUserId()
      }, function (data) {
        if (data.count !== undefined && data.count > 0) {
          delay.resolve(data.results[0]);
        } else {
          delay.resolve(null);
        }
      }, function () {
        growl.error("Some error happened");
        delay.reject(('Some error happened'));
      });
      return delay.promise;
    };
  }]);
