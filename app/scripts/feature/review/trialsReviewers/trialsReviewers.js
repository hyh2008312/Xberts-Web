'use strict';

angular.module('xbertsApp')
  .directive('trialsReviewers', ['InviteService',function(InviteService) {
    return {
      restrict: 'E',
      scope: {
        reviewers: '='
      },
      templateUrl: 'scripts/feature/review/trialsReviewers/trials-reviewers.html',
      link: function (scope, element, attrs, ctrls) {
        scope.reviewers = scope.reviewers || [];
      }
    }
  }]);
