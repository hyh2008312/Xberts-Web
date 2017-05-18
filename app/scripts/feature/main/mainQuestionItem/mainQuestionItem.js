angular.module('xbertsApp')
  .directive('mainQuestionItem',['$rootScope','AskService',function ($rootScope,AskService) {
    return {
      restrict: 'E',
      scope: {
        questions: '='
      },
      templateUrl: 'scripts/feature/main/mainQuestionItem/main-question-item.html',
      link: function (scope, element, attrs, ctrls) {
        scope.latestQuestions = questions[0];

        scope.follow = function(question) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          scope.$emit('backdropOn', 'post');
          AskService.follow(product.id).then(function(data) {
            question.currentUser.follow = data.follow;
            if(data.follow) {
              question.followeeCount++;
            } else {
              question.followeeCount--;
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


      }
    }
  }]);
