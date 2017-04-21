'use strict';

angular.module('xbertsApp')
  .controller('TrialDetailController', ['$rootScope', 'review', 'pendingApplicantPaginator', 'selectedApplicantPaginator',
    function ($rootScope, review, pendingApplicantPaginator, selectedApplicantPaginator) {
      var self = this;

      self.review = review;

      self.isShowReviews = (self.review.status == 'ENDED');
      if(self.isShowReviews) {
        self.pendingApplicantPaginator = pendingApplicantPaginator;
        self.selectedApplicantPaginator = selectedApplicantPaginator;
      }

      var title = review.title;
      var description = review.project.description;
      var backgroundColor = 'background-bg-light';
      var shareImage = review.project.mainImage;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

      // Send project category to GA
      if (dataLayer) {
        if (review.project.categories[0]) {
          dataLayer.push({

            projectCategory: review.project.categories[0].name
          });
        }
      }
    }]);
