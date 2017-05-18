angular.module('xbertsApp')
  .directive('myQuestionsList', ['$rootScope','$mdDialog','AskService','localStorageService',
    function($rootScope,$mdDialog, AskService,localStorageService) {
    return {
      restrict: 'E',
      scope: {
        posts: '=',
        currentUser: '='
      },
      templateUrl: 'scripts/feature/profile/myQuestionsList/my-questions-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.posts = scope.posts || [];
      }
    }
  }]);
