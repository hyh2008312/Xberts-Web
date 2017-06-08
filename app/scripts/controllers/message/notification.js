'use strict';

angular.module('xbertsApp')
  .controller('MessageNotificationCtrl', ['$scope', '$state', '$stateParams', 'mePaginator','systemPaginator',
    'followPaginator', 'MessageService',
    function($scope, $state, $stateParams, mePaginator, systemPaginator, followPaginator, MessageService) {
      $scope.mePaginator = mePaginator;
      $scope.systemPaginator = systemPaginator;
      $scope.followPaginator = followPaginator;
      $scope.order = MessageService.notificationCategories;
      $scope.showSender = [false, true, false];

      $scope.changeOrder = function($index) {
        $scope.order = $index;
        MessageService.notificationCategories = $scope.order;
      };

    }]);


