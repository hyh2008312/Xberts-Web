'use strict';

angular.module('xbertsApp')
  .controller('TrialListPageController', ['$scope', '$rootScope', 'trialPaginator','ReviewService',
    function ($scope, $rootScope, trialPaginator,ReviewService) {

      var self = this;

      var title = 'Trials – Try latest gadgets';
      var description = 'Try the coolest products for Free or with Deep Discount, and share your reviews with our community. ';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

      self.trialPaginator = trialPaginator;
    }]);
