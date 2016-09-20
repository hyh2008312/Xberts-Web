'use strict';

angular.module('xbertsApp')
  .controller('ReviewListCtrl', ['$scope', '$rootScope', 'releaseReviewPaginator', 'betaReviewPaginator', 'recommendedReportsPaginator', '$state',
    function ($scope, $rootScope, releaseReviewPaginator, betaReviewPaginator, recommendedReportsPaginator, $state) {


      var backgroundColor = 'background-bg-light';
      $rootScope.pageSettings.setBackgroundColor('backgroundColor');
      $scope.releaseReviewPaginator = releaseReviewPaginator;
      $scope.betaReviewPaginator = betaReviewPaginator;
      //$scope.completedReviewPaginator = completedReviewPaginator;
      $scope.recommendedReportsPaginator = recommendedReportsPaginator;
      $rootScope.pageSettings.setPage();

      $scope.buyNow = function (id, $event) {
        $state.go('application.campaign', {reviewId: id});
      };

      $scope.applyNow = function (id, $event) {
        $state.go('application.campaign', {reviewId: id});
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
        //, {
        //  id: 1,
        //  image: 'https://xberts.imgix.net/static/banner/emie_lamp.jpg?auto=format%2Cenhance&crop=entropy&fit=crop&h=600&q=60&w=1200&s=0f434daa97bbf3c5f68e3c57c7d7ac02',
        //  title: 'Elfy Connected Lamp',
        //  subtitle: 'This adorable connected lamp brings brightness, warmth and companion to you.',
        //  buttonShow: true,
        //  buttonText: 'Get It Now',
        //  buttonColor: 'btn-primary',
        //  url: 'application.campaign',
        //  params: {reviewId: 47}
        //}, {
        //  id: 2,
        //  image: 'https://xberts.imgix.net/static/banner/emie_watch.jpg?auto=format%2Cenhance&crop=entropy&fit=crop&h=600&q=60&w=1200&s=3019acdc204f7120f9c5a767e0b98b5c',
        //  title: 'Nevo Balade Parisienne Smart Watch',
        //  subtitle: 'Stay on top of your health and fitness goals, without compromising on your sense of style.',
        //  buttonShow: true,
        //  buttonText: 'Get It Now',
        //  buttonColor: 'btn-primary',
        //  url: 'application.campaign',
        //  params: {reviewId: 48}
        //}, {
        //  id: 3,
        //  image: 'https://xberts.imgix.net/static/banner/jorno_keyboard.jpg?auto=format%2Cenhance&crop=entropy&fit=crop&h=600&q=60&w=1200&s=37e53a8accf2a74e6ed34579a239b1fc',
        //  title: 'Jorno Folding Bluetooth Keyboard',
        //  subtitle: 'Just your type. Check out this ultra-slim compact folding keyboard.',
        //  buttonShow: true,
        //  buttonText: 'Get It Now',
        //  buttonColor: 'btn-primary',
        //  url: 'application.campaign',
        //  params: {reviewId: 49}
        //}
      ];

      $scope.slideButtonClick = function (slide) {
        $state.go(slide.url, slide.params);
      };
    }])
  .controller('ReviewPreLaunchListCtrl', ['$scope', '$rootScope', 'preLaunchReviewPaginator', '$state',
    function ($scope, $rootScope, preLaunchReviewPaginator, $state) {


      var backgroundColor = 'background-bg-light';
      $rootScope.pageSettings.setBackgroundColor('backgroundColor');
      $scope.preLaunchReviewPaginator = preLaunchReviewPaginator;
      $rootScope.pageSettings.setPage();

      $scope.buyNow = function (id, $event) {
        $state.go('application.campaign', {reviewId: id});
      };

      $scope.applyNow = function (id, $event) {
        $state.go('application.campaign', {reviewId: id});
      };
    }]);
