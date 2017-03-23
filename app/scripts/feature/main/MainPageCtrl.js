angular.module('xbertsApp')
  .controller('MainPageCtrl', ['$rootScope','discoverProductsPagination','trialsPagination','reviewsPagination','topReviewersPagination',
    function ($rootScope, discoverProductsPagination, trialsPagination, reviewsPagination, topReviewersPagination) {
      var mainCtrl = this;
      console.log(trialsPagination);
      mainCtrl.discoverProductsPagination = discoverProductsPagination.items;
      mainCtrl.trialsPagination = trialsPagination.items;
      mainCtrl.reviewsPagination = reviewsPagination.items;
      mainCtrl.topReviewersPagination = topReviewersPagination.items;

      var title = '';
      var description = '';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);

