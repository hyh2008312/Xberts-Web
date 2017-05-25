angular.module('xbertsApp')
  .directive('answerItem',['$rootScope','ExpertService',function($rootScope,ExpertService) {
    return {
      restrict: 'E',
      scope: {
        answers: '='
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

      }
    }
  }]);
