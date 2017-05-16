angular.module('xbertsApp')
  .directive('answerLeaders', function () {
    return {
      restrict: 'E',
      scope: {
        leaders: '='
      },
      templateUrl: 'scripts/feature/ask/answerLeaders/answer-leaders.html',
      link: function (scope, element, attrs, ctrls) {

      }
    }
  });
