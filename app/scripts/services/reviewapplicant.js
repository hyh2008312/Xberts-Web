'use strict';

angular.module('xbertsApp')
  .factory('ReviewApplicant', ['$resource', 'Configuration', '$rootScope', '$q', function ($resource, Configuration, $rootScope, $q) {
    var Applicant = $resource(Configuration.apiBaseUrl + '/review/applicants/:id/', {id: '@id'},{'put': {method: 'PUT'}});
    var applicant = {};

    return {
      getApplicationResource: function (data) {
        applicant=new Applicant(data);
        return applicant;
      },
      getApplication: function () {
        return applicant;
      },
      getApplicationPromise: function ($stateParams) {
        var delay = $q.defer();
        Applicant.get({
          review_id: $stateParams.reviewId,
          reviewer_id: $rootScope.user.getUserId()
        }, function (data) {
          if (data.count !== undefined && data.count > 0) {
            delay.resolve(data.results[0]);
          } else {
            delay.resolve({});
          }
        }, function () {
          growl.error("Sorry, you have not been selected for this review.");
          delay.reject(('Unable to fetch Applicantsreview'));
        });
        return delay.promise;
      }
    }
  }]);
