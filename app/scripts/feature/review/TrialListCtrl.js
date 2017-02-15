'use strict';

angular.module('xbertsApp')
  .controller('TrialListController', ['$scope', '$rootScope', 'trialPaginator','ReviewService',
    function ($scope, $rootScope, trialPaginator,ReviewService) {

      var self = this;

      var backgroundColor = 'background-bg-light';
      $rootScope.pageSettings.setBackgroundColor('backgroundColor');
      $rootScope.pageSettings.setPage();

      self.trialPaginator = trialPaginator;

      self.isPaidTrial = ReviewService.isPaidTrial;
      self.isDepositTrial = ReviewService.isDepositTrial;
      self.isFlashsale = ReviewService.isFlashsale;

      self.offPercentage = function (review) {
        if (review.flashsale) {
          var retailPrice = review.project.retailPrice.amount;
          var salePrice  = review.flashsale.salePrice.amount;
          var decimal = (retailPrice - salePrice) / retailPrice;
          return Math.round(decimal * 100);
        } else {
          return 0;
        }
      };
    }]);
