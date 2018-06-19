'use strict';

angular.module('xbertsApp')
  .controller('ReviewMainCtrl', ['$scope', '$rootScope', 'reviewerPaginator', 'betaReviewPaginator', 'recommendedReportsPaginator', '$state',
    function ($scope, $rootScope, reviewerPaginator, betaReviewPaginator, recommendedReportsPaginator, $state) {


      $scope.value=3;
      $scope.reviewerPaginator = reviewerPaginator;
      $scope.betaReviewPaginator = betaReviewPaginator;
      $scope.recommendedReportsPaginator = recommendedReportsPaginator;

      $scope.buyNow = function (id, $event) {
        $state.go('application.testcampaign', {reviewId: id});
      };

      $scope.applyNow = function (id, $event) {
        $state.go('application.testcampaign', {reviewId: id});
      };

      $scope.active = 0;
      $scope.slides = [
        {
          id: 0,
          image: 'https://xberts.imgix.net/static/banner/engineer_adjusting_3d_printer.jpg?auto=format%2Cenhance&crop=entropy&fit=crop&h=600&q=60&w=1200&s=c5544734db8e38f9c68e9be878867179',
          title: 'Discover Perfect and Money-Saving Products <br/>Through Our Expert Community',
          subtitle: 'We bring you the best products that have been tested by trusted experts',
          buttonShow: !$rootScope.user.isAuth(),
          buttonText: 'Sign Up Now',
          buttonColor: 'btn-primary',
          url: 'application.signup',
          params: {}
        }
      ];

      var title = 'Reviews – Unbiased product reviews from our community';
      var description = 'Explore new products reviewed by our community users. Share the good ones with your friends so they can make smarter purchasing decisions.';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);
