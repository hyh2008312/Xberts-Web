angular.module('xbertsApp')
  .config(['$urlRouterProvider','$stateProvider', function ($urlRouterProvider,$stateProvider) {

    $stateProvider
    .state('application.askQuestionMain', {
      url: '/ask',
      templateUrl: 'scripts/feature/ask/questionListPage.html',
      controller: 'QuestionListPage as askCtrl',
      resolve: {
        askPaginator: ['Paginator', 'AskService', 'AskModel', function (Paginator, AskService, AskModel) {
          var _par = AskService.askPaginator[AskService.order];
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
              if(!_par) {
                _par = new Paginator(par);
                AskService.askPaginator[AskService.order] = _par;
                _par.load();
              } else {
                _par = AskService.askPaginator[AskService.order];
              }
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
              if(!_par) {
                _par = new Paginator(par);
                AskService.askPaginator[AskService.order] = _par;
                _par.load();
              } else {
                _par = AskService.askPaginator[AskService.order];
              }
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
              if(!_par) {
                _par = new Paginator(par);
                AskService.askPaginator[AskService.order] = _par;
                _par.load();
              } else {
                _par = AskService.askPaginator[AskService.order];
              }
              break;
            case 3:
              var par = {
                name: 'ask_questions_list_pending',
                objClass: AskModel,
                params: {
                  page_size: 12
                },
                fetchFunction: AskService.getPending
              };
              if(!_par) {
                _par = new Paginator(par);
                AskService.askPaginator[AskService.order] = _par;
                _par.load();
              } else {
                _par = AskService.askPaginator[AskService.order];
              }
              break;
          }
          return _par;
        }],
        topReviewers: ['Paginator', 'AskService', 'MainModel', function (Paginator, AskService, AskModel) {
          if(!AskService.topReviewers) {
            var par = {
              name: 'answer_leaders_list',
              objClass:AskModel,
              params: {
                type: 'week',
                page_size: 12
              },
              fetchFunction:AskService.getAnswerLeaderList
            };
            AskService.topReviewers = new Paginator(par);
            return AskService.topReviewers.load();
          } else {
            return AskService.topReviewers;
          }

        }]
      }
    })
    //.state('application.askQuestionMain.answerQuestionDetail', {
    //    url: '/:questionId?pending',
    //    templateUrl: 'scripts/feature/ask/answerDetail.html',
    //    controller: 'AnswerDetailCtrl as answerCtrl',
    //    resolve: {
    //      productsDetail: ['AskService','$stateParams',function(AskService, $stateParams) {
    //        return AskService.getQuestionsDetail($stateParams.questionId);
    //      }],
    //      answerPaginator: ['Paginator', 'AskService', 'AskModel', '$stateParams','localStorageService',
    //        function (Paginator, AskService, AskModel, $stateParams,localStorageService) {
    //          localStorageService.remove('ask_answers_list' + '_currentPage');
    //          localStorageService.remove('ask_answers_list' + '_items');
    //          localStorageService.remove('ask_answers_list' + '_next');
    //          localStorageService.remove('ask_answers_list' + '_count');
    //          var par = {
    //            name: 'ask_answers_list',
    //            objClass: AskModel,
    //            params: {
    //              ordering: '-is_best_answer,-approve_at',
    //              question: $stateParams.questionId,
    //              page_size: 12
    //            },
    //            fetchFunction: AskService.getAnswersList
    //          };
    //          return new Paginator(par).load();
    //        }]
    //    }
    //  })
    .state('application.answerQuestionDetail', {
        url: '/ask/:questionId?pending',
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
    })
    .state('application.protected.askQuestion', {
      url: '/ask/question/edit',
      templateUrl: 'scripts/feature/profile/myQuestionsList/editMyQuestions.html',
      controller: 'EditQuestionsCtrl',
      resolve: {
        category: ['ShareProductService', function (ShareProductService) {
          return ShareProductService.getCategoryList();
        }]
      }
    });


  }]);
