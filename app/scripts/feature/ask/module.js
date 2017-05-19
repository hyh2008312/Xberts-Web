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
            name: 'ask_questions_list',
            objClass: AskModel,
            params: {
              page_size: 12
            },
            fetchFunction: AskService.getList
          };
          return new Paginator(par).load();
        }],
        topReviewers: ['Paginator', 'AskService', 'MainModel', function (Paginator, AskService, AskModel) {
          var par = {
            name: 'answer_leaders_list',
            objClass:AskModel,
            params: {
              page_size: 12
            },
            fetchFunction:AskService.getAnswerLeaderList
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
        productsDetail: ['AskService','$stateParams',function(AskService, $stateParams) {
          return AskService.getQuestionsDetail($stateParams.questionId);
        }],
        answerPaginator: ['Paginator', 'AskService', 'AskModel', '$stateParams','localStorageService', function (Paginator, AskService, AskModel, $stateParams,localStorageService) {
          var par = {
            name: 'ask_answers_list' + $stateParams.questionId,
            objClass: AskModel,
            params: {
              question: $stateParams.questionId,
              page_size: 12
            },
            fetchFunction: AskService.getAnswersList
          };
          return new Paginator(par).load();
        }]
      }
    })
    .state('application.answerPost', {
      url: '/answer?questionId',
      templateUrl: 'scripts/feature/ask/answerPost/answer-post.html',
      reloadOnSearch: false,
      controller: 'AnswerPostCtrl'
    });
  }]);
