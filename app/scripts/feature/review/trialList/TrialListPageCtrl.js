'use strict';

angular.module('xbertsApp')
  .controller('TrialListPageController', ['$scope', '$rootScope', 'trialPaginator','ReviewService',
    function ($scope, $rootScope, trialPaginator,ReviewService) {

      var self = this;

      var backgroundColor = 'background-bg-light';
      $rootScope.pageSettings.setBackgroundColor('backgroundColor');
      $rootScope.pageSettings.setPage();

      self.trialPaginator = trialPaginator;

      self.isPaidTrial = ReviewService.isPaidTrial;
      self.isDepositTrial = ReviewService.isDepositTrial;
      self.isFlashsale = ReviewService.isFlashsale;
      self.offPercentage = ReviewService.offPercentage;
    }]);
