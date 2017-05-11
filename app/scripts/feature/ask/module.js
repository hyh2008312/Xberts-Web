angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.askQuestionMain', {
      url: '/ask',
      templateUrl: 'scripts/feature/ask/questionListPage.html',
      controller: 'QuestionListPage as askCtrl',
      resolve: {
        askPaginator: ['Paginator', 'AskService', 'AskModel', function (Paginator, AskService, AskModel) {
          var par = {
            name: 'question_list',
            objClass: AskModel,
            params: {
              page_size: 12
            },
            fetchFunction: AskService.getList
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
