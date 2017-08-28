angular.module('xbertsApp')
  .controller('QuestionListPage', ['$rootScope','askPaginator','topReviewers','$mdDialog','AskService','Paginator',
    '$state','$scope',
    function ($rootScope,askPaginator,topReviewers,$mdDialog,AskService,Paginator,$state,$scope) {

    var askCtrl = this;
    askCtrl.askPaginator = askPaginator;
    askCtrl.topReviewers = topReviewers;
    askCtrl.order = AskService.order;
    askCtrl.sort = AskService.getSort();

    askCtrl.selectedIndex = 0;
    askCtrl.changeSort = function(sort) {
      switch(sort) {
        case 0 :
          askCtrl.topReviewers.params.type = 'week';
          break;
        default :
          askCtrl.topReviewers.params.type = null;
          break;
      }
      askCtrl.topReviewers.clear();
      askCtrl.topReviewers.load();
    };

    askCtrl.addQuestion = function(ev) {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      $state.go('application.protected.askQuestion');
    };

    $rootScope.$on('$stateChangeStart', function () {
      if($rootScope.state.current.name == 'application.askQuestionMain.answerQuestionDetail') {
        $scope.isPopupOpen = false;
        $scope.display = false;
      }
    });

    $scope.isPopupOpen = false;
    $scope.display = false;

    askCtrl.openPop = function(questionId) {
      $scope.display = true;
      $state.go('application.askQuestionMain.answerQuestionDetail',{questionId:questionId, isPopupOpen: true});
    };

    $scope.jumpToAsk = function (isPopupOpen,display) {
      if(!isPopupOpen && display) {
        $state.go('application.askQuestionMain');
      }
    };

    askCtrl.changeOrder = function(order) {
      AskService.order = order;
      askCtrl.order = AskService.order;
      switch (askCtrl.order) {
        case 0:
          var par = {
            name: 'ask_questions_list',
            objClass: AskModel,
            params: {
              page_size: 12
            },
            fetchFunction: AskService.getList
          };
          askCtrl.askPaginator = new Paginator(par);
          askCtrl.askPaginator.clear();
          askCtrl.askPaginator.load();
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
          askCtrl.askPaginator = new Paginator(par);
          askCtrl.askPaginator.clear();
          askCtrl.askPaginator.load();
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
          askCtrl.askPaginator = new Paginator(par);
          askCtrl.askPaginator.clear();
          askCtrl.askPaginator.load();
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
          askCtrl.askPaginator = new Paginator(par);
          askCtrl.askPaginator.clear();
          askCtrl.askPaginator.load();
          break;
      }
    };

    var title = 'Ask - Ask Xberts Community & Make Smart Purchasing Decision';
    var description = 'Get recommendations and tips from our global community of savvy-shoppers';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

