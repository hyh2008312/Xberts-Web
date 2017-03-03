angular.module('xbertsApp')
  .directive('feedbackItem', ['CommentService', function (CommentService) {
    return {
      restrict: 'E',
      scope: {
        feedback: '='
      },
      require: '^^interact',
      templateUrl: 'scripts/components/comments/feedbackItem.html',

      controller: function ($scope) {
        this.leaveComment = function (comment) {
          comment.feedback = $scope.feedback.id;
          return CommentService.create(comment).then(function (comment) {
            $scope.feedback.comments.push(comment)
          });
        };

      },
      controllerAs: 'feedbackItemCtrl',
      link: function (scope, element, attrs, interactCtrl) {

        scope.replyToggle = false;

        scope.newComment = {};

        scope.replyClick = function () {
          scope.replyToggle = !scope.replyToggle;
        };

        scope.leaveComment = function (commentForm) {
          if (commentForm.$valid) {
            interactCtrl.getCurrentJoin().then(
              function (currentJoin) {
                scope.newComment.post_to_id = scope.feedback.getPostId();
                scope.newComment.post_id = currentJoin.id;
                scope.feedbackItemCtrl.leaveComment(scope.newComment).then(function () {
                    scope.replyToggle = false;
                    scope.newComment = {};
                  }, function (error) {
                    console.log(error);
                  }
                );
              }
            )

          }
        };
      }
    }
  }]);
