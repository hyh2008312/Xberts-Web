angular.module('xbertsApp')
  .directive('myPostList', ['$rootScope','$mdDialog','ShareProductService',function($rootScope,$mdDialog, ShareProductService) {
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
            if(!$rootScope.user.authRequired()) {
              return;
            }
            ShareProductService.delete(id).then(function () {
              scope.$emit('backdropOff', 'success');
              var name = 'posts_' + $rootScope.user.getUserId();
              // clear post list
              localStorageService.remove(name + '_currentPage');
              localStorageService.remove(name + '_items');
              localStorageService.remove(name + '_next');
              localStorageService.remove(name + '_count');

            }, function () {
              // tips
              scope.$emit('backdropOff', 'project get error');
              // post end
            });
          });
        }
      }
    }
  }]);
