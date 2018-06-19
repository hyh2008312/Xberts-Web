angular.module('xbertsApp')
  .directive('myArticlesList', ['$rootScope','$mdDialog',
    function($rootScope,$mdDialog) {
    return {
      restrict: 'E',
      scope: {
        posts: '=',
        currentUser: '='
      },
      templateUrl: 'scripts/feature/profile/myArticlesList/my-articles-list.html',
      link: function (scope, element, attrs, ctrls) {

        scope.showMenu = function(post) {
          angular.forEach(scope.posts,function(e, i) {
            e.showMenu = false;
          });
          post.showMenu = !post.showMenu;
        };

        scope.closeMenu = function() {
          angular.forEach(scope.posts,function(e, i) {
            e.showMenu = false;
          });
        };

      }
    }
  }]);
