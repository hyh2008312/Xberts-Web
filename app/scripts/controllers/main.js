'use strict';

angular.module('xbertsApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$state', 'modalWrap', 'projectPaginator', 'eventPaginator', 'expertPaginator', 'projectReviewPaginator',
    function ($scope, $rootScope, $state, modalWrap, projectPaginator, eventPaginator, expertPaginator, projectReviewPaginator) {
      $rootScope.pageSettings.setBackgroundColor('');
      $rootScope.pageSettings.setShareImage('https://xberts.com/images/landing_1_1.d836e5d1.jpg');

      $scope.eventPaginator = eventPaginator;
      $scope.projectPaginator = projectPaginator;
      $scope.expertPaginator = expertPaginator;
      $scope.projectReviewPaginator = projectReviewPaginator;

      $scope.isOutDated = function (time) {
        return Date.now() - new Date(time) > 0;
      };
      $scope.slides = [
        {
          image: '/images/landing_1_1.jpg',
          title: 'Bring Hardware Innovations to The World',
          subtitle: "A cross-border market network where smart hardware manufacturers meet<br/> product reviewers, tech influencers, buyers and partners from around the world",
          buttonText: 'Get Started',
          buttonColor: 'button-primary',
          captionLocation: '',
          url: 'application.crowdtestings',
          params: {}
        },
        {
          image: '/images/alphasense.jpg',
          title: '',
          subtitle: '',
          buttonText: 'Apply Now',
          buttonColor: 'button-primary',
          captionLocation: 'carousel-center',
          url: 'application.crowdtesting',
          params: {reviewId: 19}
          //buttonBorder:'button-border'
        },
        {
          image: '/images/nox_review.jpg',
          title: '',
          subtitle: '',
          buttonText: 'Apply Now',
          buttonColor: 'button-primary',
          captionLocation: 'carousel-center',
          url: 'application.crowdtesting',
          params: {reviewId: 20}
          //buttonBorder:'button-border'
        },
        {
          image: '/images/drf_review.jpg',
          title: '',
          subtitle: '',
          buttonText: 'Apply Now',
          buttonColor: 'button-primary',
          captionLocation: 'carousel-center',
          url: 'application.crowdtesting',
          params: {reviewId: 17}
          //buttonBorder:'button-border'
        },
        {
          image: '/images/vinci.jpg',
          title: '',
          subtitle: '',
          buttonText: 'Apply Now',
          buttonColor: 'button-primary',
          captionLocation: 'carousel-center',
          url: 'application.crowdtesting',
          params: {reviewId: 15}
          //buttonBorder:'button-border'
        },
      ];

      $scope.slideButtonClick = function (slide) {
        if (slide === $scope.slides[0]) {
          // Special case login for get started button on first slide that's based on user login status
          if ($rootScope.user.isAuth()) {
            $state.go(slide.url, slide.params);
          } else {
            $state.go('application.signup');
          }
        } else {
          $state.go(slide.url, slide.params);
        }
      };
    }]);
