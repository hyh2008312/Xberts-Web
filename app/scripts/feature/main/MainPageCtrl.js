angular.module('xbertsApp')
  .controller('MainPageCtrl', ['$rootScope','topBanner','dealsPaginator','discoverProducts','latestPaginater','reviews',
    'topReviewers','askPaginator','answerPaginator','$stateParams','AuthService',
    function ($rootScope, topBanner, dealsPaginator, discoverProducts, latestPaginater, reviews, topReviewers,
              askPaginator,answerPaginator,$stateParams,AuthService) {

      if($stateParams.uid && $stateParams.token) {
        AuthService.veridateEmail($stateParams);
      }

      var mainCtrl = this;
      mainCtrl.topBanner = topBanner;
      mainCtrl.dealsPaginator = dealsPaginator.items;
      mainCtrl.discoverProducts = discoverProducts.items;
      mainCtrl.latestPaginater = latestPaginater;
      mainCtrl.reviews = reviews.items;
      mainCtrl.topReviewers = topReviewers.items;
      mainCtrl.askPaginator = askPaginator.items;
      mainCtrl.answerPaginator = answerPaginator.items;

      var title = '';
      var description = '';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);

