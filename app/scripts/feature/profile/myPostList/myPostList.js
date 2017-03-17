angular.module('xbertsApp')
  .directive('myPostList', function () {
    return {
      restrict: 'E',
      scope: {
        posts: '='
      },
      templateUrl: 'scripts/feature/profile/myPostList/my-post-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.posts = scope.posts || [];
      }
    }
  });
