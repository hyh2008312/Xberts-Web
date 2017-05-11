angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.askQuestionMain', {
      url: '/ask',
      templateUrl: 'scripts/feature/ask/questionListPage.html',
      controller: 'QuestionListPage as askCtrl',
      resolve: {
        askPaginator: ['Paginator', 'ShareProductService', 'ShareProduct', function (Paginator, ShareProductService, ShareProduct) {
          var par = {
            name: 'share_product_list',
            objClass: ShareProduct,
            params: {
              category: ShareProductService.categoryId,
              page_size: 5
            },
            fetchFunction: ShareProductService.getList
          };
          return new Paginator(par).load();
        }],
        topReviewers: ['Paginator', 'MainService', 'MainModel', function (Paginator, MainService, MainModel) {
          var par = {
            name: 'callingReviewMain',
            objClass:MainModel,
            params: {
              stage: 'READY_FOR_SALE',
              status: 'APPLICATION',
              page_size: 12
            },
            fetchFunction:MainService.getRecommendedReviewers
          };
          return new Paginator(par).load();
        }]
      }
    })
    .state('application.answerQuestionDetail', {
      url: '/ask/:questionId',
      templateUrl: 'scripts/feature/ask/answerDetail.html',
      controller: 'AnswerDetailCtrl as answerCtrl',
      resolve: {
        productsDetail: ['ShareProductService','$stateParams',function(ShareProductService, $stateParams) {
          return ShareProductService.getDetail($stateParams.reviewId);
        }],
        recommendList: ['ShareProductService','$stateParams',function(ShareProductService, $stateParams) {
            return ShareProductService.getRecommendList($stateParams.reviewId);
          }]
      }
    });
  }]);
