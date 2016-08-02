'use strict';

angular.module('xbertsApp')
  .controller('ReviewListCtrl', ['$scope', '$rootScope', 'releaseReviewPaginator', 'betaReviewPaginator', 'completedReviewPaginator', '$state',
    function ($scope, $rootScope,releaseReviewPaginator,betaReviewPaginator, completedReviewPaginator, $state) {

      var title = 'Xberts - Crowdtesting';
      var description = 'Receive free samples of new products to test and review!Launch a Campaign';
      var backgroundColor = 'background-bg-light';
      var shareImage = 'https://xberts.com/media/project/2016/03/11/3I9WcKxdVp.png';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);
      $scope.releaseReviewPaginator = releaseReviewPaginator;
      $scope.betaReviewPaginator = betaReviewPaginator;
      $scope.completedReviewPaginator = completedReviewPaginator;

      $scope.buyNow = function (id, $event) {
        $state.go('application.campaign', {reviewId: id, action: 'buy'});
      };

      $scope.applyNow = function (id, $event) {
        $state.go('application.protected.apply', {reviewId: id});
      };

      $scope.active = 0;
      $scope.slides = [
        {
          id: 0,
          image: '/images/Emie_lamp.jpg',
          title: 'This adorable connected lamp brings brightness, warmth and companion to you',
          subtitle: "",
          buttonText: 'Try Me Now',
          buttonColor: 'button-primary',
          url: 'application.campaign',
          params: {reviewId: 31}
        }
        , {
          id: 1,
          image: '/images/Emie_Watch.jpeg',
          title: 'Stay on top of your health and fitness goals, without compromising on your sense of style',
          subtitle: "",
          buttonText: 'Try Me Now',
          buttonColor: 'button-primary',
          url: 'application.campaign',
          params: {reviewId: 31}
        }
        , {
          id: 2,
          image: '/images/Jorno_keyboard.jpg',
          title: 'Just your type. Check out this ultra-slim compact folding keyboard',
          subtitle: "",
          buttonText: 'Try Me Now',
          buttonColor: 'button-primary',
          url: 'application.campaign',
          params: {reviewId: 32}
        }
      ];
    }]);
