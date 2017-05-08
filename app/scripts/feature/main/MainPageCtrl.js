angular.module('xbertsApp')
  .controller('MainPageCtrl', ['$rootScope','topBanner','dealsPaginator','discoverProducts','latestPaginater','reviews','topReviewers',
    function ($rootScope, topBanner, dealsPaginator, discoverProducts, latestPaginater, reviews, topReviewers) {
      var mainCtrl = this;
      mainCtrl.topBanner = topBanner;
      mainCtrl.dealsPaginator = dealsPaginator.items;
      mainCtrl.discoverProducts = discoverProducts.items;
      mainCtrl.latestPaginater = latestPaginater;
      mainCtrl.reviews = reviews.items;
      mainCtrl.topReviewers = topReviewers.items;

      var title = '';
      var description = '';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);

