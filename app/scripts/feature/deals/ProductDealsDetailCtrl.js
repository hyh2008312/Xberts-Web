'use strict';

angular.module('xbertsApp')
  .controller('ProductDealsDetailCtrl', ['$rootScope','$scope','productsDetail','productsPaginator', 'InviteService',
    function($rootScope,$scope,productsDetail,productsPaginator, InviteService) {
      $scope.productsDetail = productsDetail;
      $scope.productsPaginator = productsPaginator;
      $scope.inviteObj = angular.copy(InviteService, {});

      // FAB Speed Dial Component
      // Set the component to the normal state
      $scope.hidden = false;
      $scope.isOpen = false;
      $scope.hover = false;
      $scope.shareList = [
        { name: "facebook" },
        { name: "linkedin" },
        { name: "twitter" }
      ];

      var title = productsDetail.title;
      var description = productsDetail.description;
      var backgroundColor = 'background-bg-light';
      var shareImage = productsDetail.coverUrl;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

