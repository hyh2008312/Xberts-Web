angular.module('xbertsApp')
  .directive('answerItem',['$rootScope','ExpertService','$mdDialog','AskService','$mdToast',
    function($rootScope,ExpertService,$mdDialog,AskService,$mdToast) {
    return {
      restrict: 'E',
      scope: {
        answers: '=',
        admin: '='
      },
      templateUrl: 'scripts/feature/ask/answerItem/answer-item.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;

        scope.onToggleDown = function(answer) {
          answer.commentToggle = !answer.commentToggle;
        };

        scope.addFollow = function (answer) {
          if (!$rootScope.user.authRequired()) {
            return;
          }
          answer.disabled = true;
          ExpertService.follow({id:answer.getAnswerUserId()}).then(function(data) {
            angular.forEach(scope.answers,function(e,i) {
              if(e.getAnswerUserId() == answer.getAnswerUserId()) {
                e.owner.currentUser.follow = data.follow;
              }
            });
            answer.disabled = false;
            answer.owner.currentUser.follow = data.follow;
          }, function() {

          });
        };

        scope.showMenu = function(answer) {
          answer.showMenu = !answer.showMenu;
        };

        scope.report = function(id, ev) {
          if (!$rootScope.user.authRequired()) {
            return;
          }
          $mdDialog.show({
            controller: function(scope, $mdDialog) {
              scope.cancel = function() {
                $mdDialog.cancel();
              };
              scope.disabled = false;
              scope.report = function() {
                if (!scope.reportForm.$valid) {
                  return;
                }
                scope.disabled = true;
                AskService.report({reason: scope.reason == 'Other'? scope.other:scope.reason,id:id})
                  .then(function() {
                    scope.disabled = false;
                    scope.cancel();
                    $mdToast.show({
                      hideDelay: 3000,
                      position: 'top',
                      toastClass:'xb-ask-dialog__toast',
                      templateUrl: 'scripts/feature/ask/answerItem/report-toast.html'
                    });
                  });
              };
            },
            templateUrl: 'scripts/feature/ask/answerItem/report.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            disableParenScroll: true
          });
        }
      }
    }
  }]);
