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
          var commentData = {
            feedback: $scope.feedback.id,
            details: comment.details,
            post_to_id: comment.post_to.joiner.id
          };

          return CommentService.create(commentData).then(function(comment) {
            $scope.feedback.comments.push(Comment.build(comment));
            $scope.replyToggle = false;
            $scope.newComment = {};
          });
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

            var comment = {
              details: scope.newComment.details,
              post_to: scope.feedback.post
            };

            scope.feedbackItemCtrl.leaveComment(comment);

          }
        };
      }
    }
  }]);
