'use strict';

angular.module('xbertsApp')
  .controller('TrialListController', ['$scope', '$rootScope', 'trialPaginator',
    function ($scope, $rootScope, trialPaginator) {

      var self = this;

      var backgroundColor = 'background-bg-light';
      $rootScope.pageSettings.setBackgroundColor('backgroundColor');
      $rootScope.pageSettings.setPage();

      self.trialPaginator = trialPaginator;

      self.isPaidTrial = function(review){
        var isPaid = false;
        if(review.flashsale){
          isPaid = Number(review.flashsale.salePrice.amount) > 0;
        }
        return isPaid
      };

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
