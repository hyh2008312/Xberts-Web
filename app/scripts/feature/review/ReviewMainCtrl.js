'use strict';

angular.module('xbertsApp')
  .controller('ReviewMainCtrl', ['$scope', '$rootScope', 'reviewerPaginator', 'betaReviewPaginator', 'recommendedReportsPaginator', '$state',
    function ($scope, $rootScope, reviewerPaginator, betaReviewPaginator, recommendedReportsPaginator, $state) {


      var backgroundColor = 'background-bg-light';
      $scope.value=3;
      $rootScope.pageSettings.setBackgroundColor('backgroundColor');
      $scope.reviewerPaginator = reviewerPaginator;
      $scope.betaReviewPaginator = betaReviewPaginator;
      $scope.recommendedReportsPaginator = recommendedReportsPaginator;
      $rootScope.pageSettings.setPage();

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
          title: 'Discover Creative	Products Through Expert Reviews',
          subtitle: 'We bring you the best tech and designs that are tested by influential experts',
          buttonShow: !$rootScope.user.isAuth(),
          buttonText: 'Sign Up Now',
          buttonColor: 'btn-primary',
          url: 'application.signup',
          params: {}
        }
      ];
    }]);
