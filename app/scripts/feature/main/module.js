angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.main', {
        url: "/",
        templateUrl: 'scripts/feature/main/mainPage.html',
        controller: 'MainPageCtrl as mainCtrl',
        cache:true,
        resolve: {
          topBanner:['MainService',function(MainService) {
            return MainService.getBannerList();
          }]
        }
      })
      .state('application.verificationEmail', {
        url: '/accounts/verify/email/:uid/:token',
        templateUrl: 'scripts/feature/main/mainPage.html',
        controller: 'MainPageCtrl as mainCtrl',
        cache:true,
        resolve: {
          topBanner:['MainService',function(MainService) {
            return MainService.getBannerList();
          }]
        }
      })
  }]);
