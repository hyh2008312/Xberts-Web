angular.module('xbertsApp')
  .directive('questionItem',function () {
    return {
      restrict: 'E',
      scope: {
        products: '='
      },
      templateUrl: 'scripts/feature/ask/questionItem/question-item.html',
      link: function (scope, element, attrs, ctrls) {
        scope.products = scope.products || {};


      }
    }
  });
