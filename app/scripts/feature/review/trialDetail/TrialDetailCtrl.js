'use strict';

angular.module('xbertsApp')
  .controller('TrialDetailController', ['$rootScope', 'review', 'pendingApplicantPaginator', 'selectedApplicantPaginator',
    'Paginator','ReviewService',
    function ($rootScope, review, pendingApplicantPaginator, selectedApplicantPaginator,Paginator,ReviewService) {
      var self = this;

      self.review = review;

      self.disabled = false;

      if($rootScope.user.isAuth()) {
        var par = {
          name: 'xb_applicant_' + review.id,
          params: {
            review_id: review.id,
            reviewer_id: $rootScope.user.getUserId()
          },
          fetchFunction: ReviewService.checkIsApplicant
        };
        self.isAuthReviewer = new Paginator(par);
        self.isAuthReviewer.load().then(function(data) {
          if(data.items.length > 0) {
            self.disabled = true;
          }
        });
      }

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
