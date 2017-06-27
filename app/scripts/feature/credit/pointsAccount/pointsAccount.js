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
        scope.pointsTotal = scope.total - parseInt(scope.points.consumed);
        scope.myPointsList = {
          'Top Answer': 0,
          'Product Submission': parseInt(scope.points.postProductFeatured),
          'Trial Participation': parseInt(scope.points.applyTrial) + parseInt(scope.points.postReviewFeatured),
          'Profile Completeness': parseInt(scope.points.hasAvatar),
          'Redeem Gifts': '-' + parseInt(scope.points.consumed),
          'Other': scope.total - parseInt(scope.points.consumed) - parseInt(scope.points.postProductFeatured) -
          parseInt(scope.points.applyTrial) - parseInt(scope.points.postReviewFeatured) - parseInt(scope.points.hasAvatar)
        };

      }
    }
  });
