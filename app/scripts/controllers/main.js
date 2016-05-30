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
      $scope.active = 0;
      $scope.slides = [
        {
          id:0,
          image: '/images/landing_1_1.jpg',
          title: 'Bring Hardware Innovations to The World',
          subtitle: "A cross-border market network where smart hardware manufacturers meet<br/> product reviewers, tech influencers, buyers and partners from around the world",
          buttonText: 'Get Started',
          buttonColor: 'button-primary',
          captionLocation: '',
          url: 'application.crowdtestings',
          params: {}
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
