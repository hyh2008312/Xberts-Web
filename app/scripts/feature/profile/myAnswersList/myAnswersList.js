angular.module('xbertsApp')
  .directive('myAnswersList',['$rootScope','$mdDialog','AskService','localStorageService',
    function($rootScope,$mdDialog,AskService,localStorageService) {
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

        scope.delete = function(ev, id, index) {
          var confirm = $mdDialog.confirm()
            .textContent('Are you sure you want to delete this answer?')
            .targetEvent(ev)
            .ok('Cancel')
            .cancel('Delete');

          $mdDialog.show(confirm).then(function() {

          }, function() {
            if(!$rootScope.user.authRequired()) {
              return;
            }
            scope.posts.splice(index, 1);
            AskService.deleteAnswer({id:id}).then(function () {
              var name = 'answers_list_' + $rootScope.user.getUserId();
              // clear post list
              localStorageService.remove(name + '_currentPage');
              localStorageService.remove(name + '_items');
              localStorageService.remove(name + '_next');
              localStorageService.remove(name + '_count');
            }, function () {});
          });
        }
      }
    }
  }]);
