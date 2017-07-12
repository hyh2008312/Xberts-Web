angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.askQuestionMain', {
      url: '/ask',
      templateUrl: 'scripts/feature/ask/questionListPage.html',
      controller: 'QuestionListPage as askCtrl',
      resolve: {
        askPaginator: ['Paginator', 'AskService', 'AskModel', function (Paginator, AskService, AskModel) {
          var par = null;
          switch (AskService.order) {
            case 0:
              var par = {
                name: 'ask_questions_list',
                objClass: AskModel,
                params: {
                  page_size: 12
                },
                fetchFunction: AskService.getList
              };
              par = new Paginator(par).load();
              break;
            case 1:
              var par = {
                name: 'ask_questions_list_amount',
                objClass: AskModel,
                params: {
                  ordering: 'answer_amount,-new_answer_arrived',
                  page_size: 12
                },
                fetchFunction: AskService.getList
              };
              par = new Paginator(par).load();
              break;
            case 2:
              var par = {
                name: 'ask_questions_list_popular',
                objClass: AskModel,
                params: {
                  page_size: 12
                },
                fetchFunction: AskService.getPopularList
              };
              par = new Paginator(par).load();
              break;
          }
          return par;
        }],
        topReviewers: ['Paginator', 'AskService', 'MainModel', function (Paginator, AskService, AskModel) {
          var par = {
            name: 'answer_leaders_list',
            objClass:AskModel,
            params: {
              type: 'week',
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
        answerPaginator: ['Paginator', 'AskService', 'AskModel', '$stateParams','localStorageService',
        function (Paginator, AskService, AskModel, $stateParams,localStorageService) {
          localStorageService.remove('ask_answers_list' + '_currentPage');
          localStorageService.remove('ask_answers_list' + '_items');
          localStorageService.remove('ask_answers_list' + '_next');
          localStorageService.remove('ask_answers_list' + '_count');
          var par = {
            name: 'ask_answers_list',
            objClass: AskModel,
            params: {
              ordering: '-is_best_answer,-approve_at',
              question: $stateParams.questionId,
              page_size: 12
            },
            fetchFunction: AskService.getAnswersList
          };
          return new Paginator(par).load();
        }]
      }
    })
    .state('application.protected.answerPost', {
      url: '/answer?questionId',
      templateUrl: 'scripts/feature/ask/answerPost/answer-post.html',
      reloadOnSearch: false,
      controller: 'AnswerPostCtrl'
    });
  }]);
