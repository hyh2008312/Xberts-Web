'use strict';

angular.module('xbertsApp')
  .controller('TrialListPageController', ['$scope', '$rootScope', 'trialPaginator','latestPaginater',
    function ($scope, $rootScope, trialPaginator, latestPaginater) {

      var self = this;

      var title = 'Crowdtesting – Test new product';
      var description = 'Test the coolest products for Free or with Deep Discount, and share your reviews with our community. ';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

      self.latestPaginater = latestPaginater;
      self.trialPaginator = trialPaginator;
    }]);
