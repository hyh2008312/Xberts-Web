angular.module('xbertsApp')
  .controller('AnswerDetailCtrl', ['$rootScope', 'productsDetail', 'answerPaginator', '$mdDialog', '$state', 'AskService',
    'localStorageService',
    function ($rootScope, productsDetail, answerPaginator, $mdDialog, $state, AskService,localStorageService) {
    var answerCtrl = this;
    answerCtrl.productsDetail = productsDetail;
    answerCtrl.answerPaginator = answerPaginator;

    answerCtrl.options = {
      height: 300,
      toolbar: [
        ['textsize', ['fontsize']],
        ['insert', ['link','video', 'picture']],
        ['view', ['fullscreen']]
      ],
      icons: {
        'caret': 'caret',
        'link': 'fa fa-link',
        'picture': 'fa fa-picture-o',
        'video': 'fa fa-youtube-play',
        'arrowsAlt': 'fa fa-arrows-alt'
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
      answerCtrl.answerPaginator.items.unshift(product);
    };



    var title = productsDetail.title;
    var description = productsDetail.description;
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

