'use strict';

angular.module('xbertsApp')
  .controller('TrialListPageController', ['$scope', '$rootScope', 'trialPaginator','latestPaginater',
    function ($scope, $rootScope, trialPaginator, latestPaginater) {

      var self = this;

      var title = 'Trials – Try latest gadgets';
      var description = 'Try the coolest products for Free or with Deep Discount, and share your reviews with our community. ';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

      self.latestPaginater = latestPaginater;
      self.trialPaginator = trialPaginator;
    }]);
