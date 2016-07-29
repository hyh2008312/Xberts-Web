'use strict';

angular.module('xbertsApp')
  .controller('ReviewListCtrl', ['$scope', '$rootScope', 'releaseReviewPaginator', 'betaReviewPaginator', 'completedReviewPaginator', '$state',
    function ($scope, $rootScope,releaseReviewPaginator,betaReviewPaginator, completedReviewPaginator, $state) {

      var title = 'Xberts - Crowdtesting';
      var description = 'Receive free samples of new products to test and review!Launch a Campaign';
      var backgroundColor = 'background-bg-white';
      var shareImage = 'https://xberts.com/media/project/2016/03/11/3I9WcKxdVp.png';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);
      $scope.releaseReviewPaginator = releaseReviewPaginator;
      $scope.betaReviewPaginator = betaReviewPaginator;
      $scope.completedReviewPaginator = completedReviewPaginator;

      $scope.applyNow = function (id, $event) {
        $state.go('application.protected.apply', {reviewId: id});
      }
    }]);
