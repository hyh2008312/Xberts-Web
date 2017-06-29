angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.main', {
        url: "/",
        templateUrl: 'scripts/feature/main/mainPage.html',
        controller: 'MainPageCtrl as mainCtrl',
        reloadOnSearch: false,
        cache:true,
        resolve: {
          topBanner:['MainService',function(MainService) {
            return MainService.getBannerList();
          }],
          answerPaginator: ['Paginator', 'AskService', 'AskModel', function (Paginator, AskService, AskModel) {
            var par = {
              name: 'main_ask_answer',
              objClass: AskModel,
              params: {
                ordering: 'answer_amount-',
                page_size: 8
              },
              fetchFunction: AskService.getList
            };
            return new Paginator(par).load();
          }]
        }
      })
      .state('application.verificationEmail', {
        url: '/accounts/verify/email/:uid/:token',
        templateUrl: 'scripts/feature/main/mainPage.html',
        controller: 'MainPageCtrl as mainCtrl',
        reloadOnSearch: false,
        cache:true,
        resolve: {
          topBanner:['MainService',function(MainService) {
            return MainService.getBannerList();
          }],
          answerPaginator: ['Paginator', 'AskService', 'AskModel', function (Paginator, AskService, AskModel) {
            var par = {
              name: 'main_ask_answer',
              objClass: AskModel,
              params: {
                ordering: 'answer_amount-',
                page_size: 8
              },
              fetchFunction: AskService.getList
            };
            return new Paginator(par).load();
          }]
        }
      })
  }]);
