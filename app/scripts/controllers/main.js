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
          title: 'Bring Asian Innovations to The World',
          subtitle: "A cross-border community where Asia’s smart hardware brands meet <br/>product reviewers, tech influencers, buyers and partners from around the world",
          buttonText: 'Get Started',
          buttonColor: 'button-primary',
          captionLocation: '',
          url: 'application.signup'
        },
        {
          image: '/images/mo_review.jpg',
          title: '',
          subtitle: '',
          buttonText: 'Apply Now',
          buttonColor: 'button-primary',
          captionLocation: 'carousel-right',
          url: 'application.review({reviewId:9})'
          //buttonBorder:'button-border'
        },
        {
          image: '/images/whome_review.jpg',
          title: '',
          subtitle: '',
          buttonText: 'Apply Now',
          buttonColor: 'button-primary',
          captionLocation: 'carousel-left',
          url: 'application.review({reviewId:10})'
          //buttonBorder:'button-border'
        }
        ,
        {
          image: '/images/dreammaker_review.jpg',
          title: '',
          subtitle: '',
          buttonText: 'Apply Now',
          buttonColor: 'button-primary',
          captionLocation: 'carousel-left',
          url: 'application.review({reviewId:12})'
          //buttonBorder:'button-border'
        }
      ];
    }]);
