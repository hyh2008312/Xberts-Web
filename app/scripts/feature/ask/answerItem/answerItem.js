angular.module('xbertsApp')
  .directive('answerItem',function() {
    return {
      restrict: 'E',
      scope: {
        products: '='
      },
      templateUrl: 'scripts/feature/ask/answerItem/answer-item.html',
      link: function (scope, element, attrs, ctrls) {

      }
    }
  });
