angular.module('xbertsApp')
  .directive('questionItem',['$rootScope','AskService',function ($rootScope,AskService) {
    return {
      restrict: 'E',
      scope: {
        products: '=',
        isAsk: '='
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


      }
    }
  }]);
