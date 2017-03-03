angular.module('xbertsApp')
  .directive('commentItem', function () {
    return {
      restrict: 'E',
      require: ['^^interact', '^^feedbackItem'],
      scope: {
        comment: '='
      },
      templateUrl: 'scripts/components/comments/commentItem.html',
      link: function (scope, element, attrs, ctrls) {

        var interactCtrl = ctrls[0];
        var feedbackItemCtrl = ctrls[1];
        scope.replyToggle = false;

        scope.replyClick = function () {
          scope.replyToggle = !scope.replyToggle;
        };

        scope.leaveComment = function (commentForm) {
          if (commentForm.$valid) {
            interactCtrl.getCurrentJoin().then(
              function (currentJoin) {
                scope.newComment.post_to_id = scope.comment.getPostId();
                scope.newComment.post_id = currentJoin.id;
                feedbackItemCtrl.leaveComment(scope.newComment).then(function () {
                  scope.replyToggle = false;
                  scope.newComment = {};
                }, function (error) {
                  console.log(error);
                });
              }
            );
          }
        };

        scope.newComment = {};
      }
    }
  });
