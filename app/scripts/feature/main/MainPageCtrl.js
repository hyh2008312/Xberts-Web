angular.module('xbertsApp')
  .controller('MainPageCtrl', ['$rootScope','topBanner','answerPaginator','Paginator','MainService','DealsService','ReviewService',
    'AskService','$stateParams','AuthService','ProductDeals','Review','MainModel',
    'AskModel',
    function ($rootScope, topBanner,answerPaginator,Paginator,MainService, DealsService, ReviewService,
              AskService,$stateParams,AuthService,ProductDeals,Review,MainModel,AskModel) {

      if($stateParams.uid && $stateParams.token) {
        AuthService.veridateEmail($stateParams);
      }

      var mainCtrl = this;
      mainCtrl.topBanner = topBanner;

      var par = {
        name: 'deals_main_list',
        objClass: ProductDeals,
        params: {
          page_size: 12
        },
        fetchFunction: DealsService.getDealsList
      };

      mainCtrl.dealsPaginator = new Paginator(par);
      mainCtrl.dealsPaginator.load();

      var par = {
        name: 'trials',
        objClass:Review,
        params: {
          page_size: 6,
          review_type: 'FREE_SAMPLE'
        },
        fetchFunction: ReviewService.getList
      };
      mainCtrl.latestPaginater = new Paginator(par);
      mainCtrl.latestPaginater.load();

      var par = {
        name: 'all_report_list',
        objClass:MainModel,
        params: {
          page_size: 6
        },
        fetchFunction: MainService.getReviewsList
      };
      mainCtrl.reviews = new Paginator(par);
      mainCtrl.reviews.load();

      var par = {
        name: 'top_review_main_list',
        objClass:MainModel,
        params: {
          recommended:'True',
          page_size: 12
        },
        fetchFunction:MainService.getRecommendedReviewers
      };
      mainCtrl.topReviewers = new Paginator(par);
      mainCtrl.topReviewers.load();

      mainCtrl.answerPaginator = answerPaginator;

      var par = {
        name: 'main_ask_questions_list',
        objClass: AskModel,
        params: {
          page_size: 4
        },
        fetchFunction: AskService.getList
      };
      mainCtrl.askPaginator = new Paginator(par);
      mainCtrl.askPaginator.load();



      var title = '';
      var description = '';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);

