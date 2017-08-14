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
          'Top Answer': parseInt(scope.points.bestAnswer),
          'Featured Questions': parseInt(scope.points.postQuestionFeatured),
          'Product Submission': parseInt(scope.points.postProductFeatured),
          'Crowdtesting Participation': parseInt(scope.points.applyTrial) + parseInt(scope.points.postReviewFeatured),
          'Profile Completeness': parseInt(scope.points.uploadAvatar),
          'Redeem Gifts': '-' + parseInt(scope.points.consumed),
          'Other': scope.total - parseInt(scope.points.consumed) - parseInt(scope.points.postProductFeatured) -
          parseInt(scope.points.applyTrial) - parseInt(scope.points.postReviewFeatured) - parseInt(scope.points.uploadAvatar)
          - parseInt(scope.points.postQuestionFeatured) - parseInt(scope.points.bestAnswer)
        };

      }
    }
  });
