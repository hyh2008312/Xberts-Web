'use strict';

angular.module('xbertsApp')
  .controller('MainCtrl', ['$scope', '$state', 'modalWrap', 'projectPaginator', 'eventPaginator', 'expertPaginator','projectReviewPaginator',
    function ($scope, $state, modalWrap, projectPaginator, eventPaginator, expertPaginator,projectReviewPaginator) {
      $scope.eventPaginator = eventPaginator;
      $scope.projectPaginator = projectPaginator;
      $scope.expertPaginator = expertPaginator;
      $scope.projectReviewPaginator = projectReviewPaginator;
      $scope.isOutDated = function (time) {
        return Date.now()-new Date(time)> 0;
      };
      $scope.slides = [
        {
          image: '/images/landing_1_1.jpg',
          title: 'Bring Innovations to Global Market',
          subtitle: 'An online ecosystem that connects smart technology innovators with distribution partners, product reviewers, industry experts and solution providers',
          buttonText:'Get Started',
          buttonColor:'btn-primary',
          url: 'application.signup'
        }
        //{
        //  image: '/images/review_4.jpg',
        //  title: '',
        //  subtitle: '',
        //  buttonText:'Apply Now',
        //  buttonColor:'btn-primary',
        //  url: 'application.review({reviewId:4})'
        //},
        //{
        //  image: '/images/review_6.jpg',
        //  title: '',
        //  subtitle: '',
        //  buttonText:'Apply Now',
        //  buttonColor:'btn-primary',
        //  url: 'application.review({reviewId:6})'
        //}
      ];
    }]);
