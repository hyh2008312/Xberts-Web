angular.module('xbertsApp')
  .controller('MainPageCtrl', ['$rootScope','topBanner','discoverProducts','trials','reviews','topReviewers',
    function ($rootScope, topBanner, discoverProducts, trials, reviews, topReviewers) {
      var mainCtrl = this;
      mainCtrl.topBanner = topBanner;
      mainCtrl.discoverProducts = discoverProducts.items;
      mainCtrl.trials = trials.items;
      mainCtrl.reviews = reviews.items;
      mainCtrl.topReviewers = topReviewers.items;

      var title = '';
      var description = '';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);

