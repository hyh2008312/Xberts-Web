angular.module('xbertsApp')
  .directive('showMore', ['$compile',function ($compile) {
    return {
      restrict: 'A',
      scope: {
        wordsLength : '=',
        wordsContent : '='
      },
      link: function (scope, element, attrs, ctrls) {
        var words = scope.wordsContent.length>scope.wordsLength? scope.wordsContent.substr(0, scope.wordsLength): scope.wordsContent;
        element.append($compile(element.contents())(scope));
      }
    }
  }]);
