angular.module('xbertsApp')
  .directive('questionItem',['$rootScope','AskService','InviteService','localStorageService',
    function ($rootScope,AskService,InviteService,localStorageService) {
    return {
      restrict: 'E',
      scope: {
        products: '=',
        hideAnswer: '='
      },
      templateUrl: 'scripts/feature/ask/questionItem/question-item.html',
      link: function (scope, element, attrs, ctrls) {

        scope.follow = function(product) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          AskService.follow(product.id).then(function(data) {
            if(product.currentUser) {
              product.currentUser.follow = data.follow;
            } else {
              product.currentUser = {};
              product.currentUser.follow = data.follow;
            }
            if(data.follow) {
              product.followeeCount++;
            } else {
              product.followeeCount--;
            }
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_currentPage');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_items');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_next');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_count');
          }, function() {});
        };

        // FAB Speed Dial Component
        // Set the component to the normal state
        scope.hidden = false;
        scope.isOpen = false;
        scope.hover = false;
        scope.shareList = [
          { name: "facebook" },
          { name: "linkedin" },
          { name: "twitter" }
        ];

        scope.inviteObj = angular.copy(InviteService, {});

      }
    }
  }]);
