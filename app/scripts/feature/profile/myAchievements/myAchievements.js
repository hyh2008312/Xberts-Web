angular.module('xbertsApp')
  .directive('myAchievements',[function() {
    return {
      restrict: 'E',
      scope: {
        achievemets:'='
      },
      templateUrl: 'scripts/feature/profile/myAchievements/my-Achievements.html',
      link: function (scope, element, attrs, ctrls) {
        scope.icons = {
          shareProductAmount:'icon-paper_edit',
          thumbsUpAmount:'thumb_up',
          answerAmount:'icon-pic-answer',
          bestAnswerAmount:'icon-pic-best-answer',
          reviewAmount:'icon-pic-review',
          reviewFeaturedAmount:'icon-pic-featured',
          inviteAmount:'icon-pic-invite-friends'
        };
      }
    }
  }]);
