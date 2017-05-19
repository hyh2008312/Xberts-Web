angular.module('xbertsApp')
  .directive('myAnswersList',function() {
    return {
      restrict: 'E',
      scope: {
        posts: '=',
        currentUser: '='
      },
      templateUrl: 'scripts/feature/profile/myAnswersList/my-Answers-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.posts = scope.posts || [];

        scope.onToggleDown = function(post) {
          post.commentToggle = !post.commentToggle;
        };
      }
    }
  });
