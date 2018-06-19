'use strict';

angular.module('xbertsApp')
  .controller('MyReferralsCtrl', ['Paginator','$scope', '$rootScope','expert','ExpertService','ProductDeals',
    function (Paginator,$scope, $rootScope,expert,ExpertService,ProductDeals) {
      $rootScope.pageSettings.setBackgroundColor('background-bg-light');

      $scope.expert = expert;
      var par = {
        name: 'myReferrals_' + $scope.expert.userId,
        objClass: ProductDeals,
        params: {
          id: $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.getInviteList
      };
      $scope.myReferrals = new Paginator(par);

    }]);
