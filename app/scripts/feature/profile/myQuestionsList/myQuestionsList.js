angular.module('xbertsApp')
  .directive('myQuestionsList', ['$rootScope','$mdDialog','AskService','localStorageService',
    function($rootScope,$mdDialog, AskService,localStorageService) {
    return {
      restrict: 'E',
      scope: {
        posts: '=',
        currentUser: '=',
        hideState: '='
      },
      templateUrl: 'scripts/feature/profile/myQuestionsList/my-questions-list.html',
      link: function (scope, element, attrs, ctrls) {

        scope.showMenu = function(post) {
          angular.forEach(scope.posts,function(e,i) {
            e.showMenu = false;
          });
          post.showMenu = !post.showMenu;
        };

        scope.closeMenu = function() {
          angular.forEach(scope.posts,function(e,i) {
            e.showMenu = false;
          });
        };

        scope.delete = function(ev, id, index) {
          var confirm = $mdDialog.confirm()
            .textContent('Are you sure you want to delete this question?')
            .targetEvent(ev)
            .ok('Cancel')
            .cancel('Delete');

          $mdDialog.show(confirm).then(function() {

          }, function() {
            if(!$rootScope.user.authRequired()) {
              return;
            }
            scope.posts.splice(index, 1);
            AskService.deleteQuestion({id:id}).then(function () {
              var name = 'questions_list_' + $rootScope.user.getUserId();
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
