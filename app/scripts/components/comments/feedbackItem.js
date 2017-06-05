angular.module('xbertsApp')
  .directive('feedbackItem', ['CommentService', 'Comment', '$rootScope',
    function (CommentService, Comment, $rootScope) {
    return {
      restrict: 'E',
      scope: {
        feedback: '='
      },
      require: '^^interact',
      templateUrl: 'scripts/components/comments/feedbackItem.html',

      controller: function ($scope) {
        this.leaveComment = function (comment) {
          comment.date_published = new Date();
          var commentData = {
            feedback: $scope.feedback.id,
            details: comment.details,
            post_to_id: comment.post_to.id,
            post_id: comment.post.id
          };
          $scope.feedback.comments.push(Comment.build(comment));
          return CommentService.create(commentData);
        };

      },
      controllerAs: 'feedbackItemCtrl',
      link: function (scope, element, attrs, interactCtrl) {

        scope.replyToggle = false;

        scope.newComment = {};

        scope.replyClick = function () {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          scope.replyToggle = !scope.replyToggle;
        };

        scope.leaveComment = function (commentForm) {
          if (commentForm.$valid) {
            interactCtrl.getOrCreateCurrentJoin().then(
              function (currentJoin) {
                var comment = {
                  details: scope.newComment.details,
                  post_to: scope.feedback.post,
                  post: currentJoin
                };

                scope.replyToggle = false;
                scope.newComment = {};

                scope.feedbackItemCtrl.leaveComment(comment);
              }
            )

          }
        };
      }
    }
  }]);
