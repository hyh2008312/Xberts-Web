angular.module('xbertsApp')
  .controller('AnswerDetailCtrl', ['$rootScope', 'productsDetail', 'answerPaginator', '$mdDialog', '$state', 'AskService',
    'localStorageService','AskModel','Paginator','$stateParams','$scope',
    function ($rootScope, productsDetail, answerPaginator, $mdDialog, $state, AskService,localStorageService,
              AskModel,Paginator,$stateParams,$scope) {

    $scope.$parent.isPopupOpen = !$stateParams.isPopupOpen;
    $scope.isPopupOpen = $stateParams.isPopupOpen;

    var answerCtrl = this;
    answerCtrl.productsDetail = productsDetail;
    answerCtrl.answerPaginator = answerPaginator;
    answerCtrl.user = $rootScope.user;
    answerCtrl.showAnswer = answerCtrl.answerPaginator.count == 0 ? true : false;

    answerCtrl.admin = $stateParams.pending;

    answerCtrl.isAnswered = {};
    if($rootScope.user.getUserId()) {
      var par = {
        name: 'ask_answers_detail',
        objClass: AskModel,
        params: {
          owner: $rootScope.user.getUserId(),
          question: productsDetail.id,
          page_size: 12
        },
        fetchFunction: AskService.getAnswersList
      };
      answerCtrl.isAnswered = new Paginator(par);
      answerCtrl.isAnswered.load();
    }

    answerCtrl.options = {
      height: 300,
      toolbar: [
        ['textsize', ['fontsize']],
        ['style', ['bold']],
        ['insert', ['link','video', 'picture']],
        ['view', ['fullscreen']]
      ],
      icons: {
        'bold': 'fa fa-bold',
        'caret': 'caret',
        'link': 'fa fa-link',
        'picture': 'fa fa-picture-o',
        'video': 'fa fa-youtube-play',
        'arrowsAlt': 'fa fa-arrows-alt',
        'trash': 'fa fa-trash',
        'unlink': 'fa fa-chain-broken'
      },
      fontSizes: ['14', '18'],
      popover:{
        image:[
          ['remove',['removeMedia']]
        ]
      }
    };

    answerCtrl.addQuestion = function(ev) {
      $mdDialog.show({
        controller: function(scope, $mdDialog) {

          scope.cancel = function() {
            $mdDialog.cancel();
          };
          scope.askQuestion = function(question) {
            if(!$rootScope.user.authRequired()) {
              scope.cancel();
              return;
            }
            if (!scope.recommendation.$valid) {
              return;
            }

            scope.$emit('backdropOn', 'post');
            AskService.create(question).then(function(data) {
              scope.cancel();
              localStorageService.remove('ask_questions_list' + '_currentPage');
              localStorageService.remove('ask_questions_list' + '_items');
              localStorageService.remove('ask_questions_list' + '_next');
              localStorageService.remove('ask_questions_list' + '_count');
              $state.go('application.askQuestionMain');
              scope.$emit('backdropOff', 'success');
            },function() {
              scope.$emit('backdropOff', 'failure');
            });
          };
        },
        templateUrl: 'scripts/feature/ask/recommendationPost/recommendation-post-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        disableParenScroll: true
      });
    };

    answerCtrl.addProduct = function (product) {
      answerCtrl.isAnswered = {};
      answerCtrl.isAnswered.items = [];
      answerCtrl.isAnswered.items.unshift(product);
      answerCtrl.answerPaginator.items.unshift(product);
      answerCtrl.answerPaginator.count++;
    };

    var title = productsDetail.title;
    var description = productsDetail.description;
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

