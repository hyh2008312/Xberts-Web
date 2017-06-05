angular.module('xbertsApp')
  .controller('QuestionListPage', ['$rootScope','askPaginator','topReviewers','$mdDialog','AskService',
    function ($rootScope,askPaginator,topReviewers,$mdDialog,AskService) {

    var askCtrl = this;
    askCtrl.askPaginator = askPaginator;
    askCtrl.topReviewers = topReviewers.items;
    askCtrl.order = AskService.order;

    askCtrl.addQuestion = function(ev) {
      if(!$rootScope.user.authRequired()) {
        return;
      }
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

            AskService.create(question).then(function(data) {
              scope.cancel();
              askCtrl.askPaginator.items.unshift(data);
            },function() {});
          };
        },
        templateUrl: 'scripts/feature/ask/recommendationPost/recommendation-post-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        disableParenScroll: true
      });
    };

    askCtrl.changeOrder = function(order) {
      AskService.order = order;
      askCtrl.order = AskService.order;
      var answerAmount = null;
      switch (askCtrl.order) {
        case 1:
          answerAmount = 'answer_amount';
              break;
      }
      askCtrl.askPaginator.params.ordering = answerAmount;
      askCtrl.askPaginator.clear();
      askCtrl.askPaginator.load();
    };

    var title = 'Ask - Ask Xberts Community & Make Smart Purchasing Decision';
    var description = 'Get recommendations and tips from our global community of savvy-shoppers';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

