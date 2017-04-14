angular.module('xbertsApp')
  .directive('pointsAccount', function () {
    return {
      restrict: 'E',
      scope: {
        points: '=',
        total: '='
      },
      templateUrl: 'scripts/feature/credit/pointsAccount/points-account.html',
      link: function (scope, element, attrs, ctrls) {
        scope.points = scope.points||{};
        scope.total = scope.total;
        scope.myPointsList = {
          'Friends Referrals': parseInt(scope.points.inviteFriend),
          'Product Submission':parseInt(scope.points.postProductFeatured),
          'Trial Participation': parseInt(scope.points.applyTrial) + parseInt(scope.points.postReviewFeatured),
          'Community Engagement':parseInt(scope.points.commentProduct) + parseInt(scope.points.commentTrial) + parseInt(scope.points.commentReview) + 10,
          'Profile Completeness':parseInt(scope.points.hasAvatar)
        };

      }
    }
  });
