angular.module('xbertsApp')
  .directive('topReviewersList', function () {
    return {
      restrict: 'E',
      scope: {
        reviewers: '='
      },
      templateUrl: 'scripts/feature/main/topReviewersList/top-reviewers-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.reviewers = scope.reviewers || [];
      }
    }
  });
