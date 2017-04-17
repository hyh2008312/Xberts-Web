angular.module('xbertsApp')
  .directive('myPostList', ['$mdDialog',function ($mdDialog) {
    return {
      restrict: 'E',
      scope: {
        posts: '=',
        currentUser: '='
      },
      templateUrl: 'scripts/feature/profile/myPostList/my-post-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.posts = scope.posts || [];

        scope.delete = function(ev, id) {
          var confirm = $mdDialog.confirm()
            .textContent('Are you sure you want to delete this post?')
            .targetEvent(ev)
            .ok('Cancel')
            .cancel('Delete');

          $mdDialog.show(confirm).then(function() {
          }, function() {
            console.log(id);
          });
        }
      }
    }
  }]);
