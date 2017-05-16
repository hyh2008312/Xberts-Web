angular.module('xbertsApp')
  .directive('questionItem',['$rootScope','AskService','InviteService',function ($rootScope,AskService,InviteService) {
    return {
      restrict: 'E',
      scope: {
        products: '='
      },
      templateUrl: 'scripts/feature/ask/questionItem/question-item.html',
      link: function (scope, element, attrs, ctrls) {

        scope.follow = function(product) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          scope.$emit('backdropOn', 'post');
          AskService.follow(product.id).then(function(data) {
            product.currentUser.follow = data.follow;
            if(data.follow) {
              product.followeeCount++;
            } else {
              product.followeeCount--;
            }
            scope.$emit('backdropOff', 'success');
          }, function() {
            scope.$emit('backdropOff', 'failure');
          });
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
