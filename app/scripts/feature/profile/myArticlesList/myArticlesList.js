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
        scope.posts = scope.posts || [];

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

        scope.delete = function(ev, id, index) {
          var confirm = $mdDialog.confirm()
            .textContent('Are you sure you want to delete this post?')
            .targetEvent(ev)
            .ok('Cancel')
            .cancel('Delete');

          $mdDialog.show(confirm).then(function() {

          }, function() {

          });
        };
      }
    }
  }]);
