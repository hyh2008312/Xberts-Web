angular.module('xbertsApp')
  .directive('answerItem',function() {
    return {
      restrict: 'E',
      scope: {
        answers: '='
      },
      templateUrl: 'scripts/feature/ask/answerItem/answer-item.html',
      link: function (scope, element, attrs, ctrls) {
        scope.onToggleDown = function(answer) {
          answer.commentToggle = !answer.commentToggle;
        };


      }
    }
  });
