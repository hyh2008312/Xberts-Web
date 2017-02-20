'use strict';

angular.module('xbertsApp')
  .controller('TrialDetailController', ['$rootScope', 'review',
    function ($rootScope,review) {
      var self = this;

      self.review = review;

      var project = review.project;
      var title = review.title;
      var description = project.description;
      var backgroundColor = 'background-bg-light';
      var shareImage = review.project.mainImage;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

      // Send project category to GA
      if (dataLayer) {
        dataLayer.push({
          projectCategory: review.project.categories[0].name
        });
      }
    }]);
