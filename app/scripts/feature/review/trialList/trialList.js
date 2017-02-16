'use strict';

angular.module('xbertsApp')
  .directive('trialList', ['ReviewService',function (ReviewService) {
    return {
      templateUrl: "scripts/feature/review/trialList/trialList.html",
      scope: {
        trials: "="
      },
      link: function (scope, element, attrs) {
        scope.isPaidTrial = ReviewService.isPaidTrial;
        scope.isDepositTrial = ReviewService.isDepositTrial;
        scope.isFlashsale = ReviewService.isFlashsale;
        scope.offPercentage = ReviewService.offPercentage;
      }
    }
  }]);
