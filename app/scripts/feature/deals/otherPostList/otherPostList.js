angular.module('xbertsApp')
  .directive('otherPostList', function() {
    return {
      restrict: 'E',
      scope: {
        posts: '=',
        id: '='
      },
      templateUrl: 'scripts/feature/deals/otherPostList/other-post-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.filter = function(item) {
          return item.id != scope.id;
        };
      }
    }
  });
