angular.module('xbertsApp')
  .controller('QuestionListPage', ['$rootScope','askPaginator','topReviewers','$mdDialog','AskService','Paginator','$mdMedia',
    '$state','MainModel','ReviewService',
    function ($rootScope,askPaginator,topReviewers,$mdDialog,AskService,Paginator,$mdMedia,$state,MainModel,ReviewService) {

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
      }
    };

    var par = {
      name: 'all_review_list_featured_top',
      objClass: MainModel,
      params: {
        is_recommended:'True',
        edit_status:'PUBLISHED',
        approval_status:'APPROVED',
        page_size: 4
      },
      fetchFunction: ReviewService.getArticleList
    };
    askCtrl.askPaginator = new Paginator(par);
    askCtrl.askPaginator.load();

    var title = 'Ask - Ask Xberts Community & Make Smart Purchasing Decision';
    var description = 'Get recommendations and tips from our global community of savvy-shoppers';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

