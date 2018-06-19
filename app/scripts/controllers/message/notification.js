'use strict';

angular.module('xbertsApp')
  .controller('MessageNotificationCtrl', ['$scope', '$state', '$stateParams', 'mePaginator','systemPaginator',
    'followPaginator', 'MessageService','$mdMedia',
    function($scope, $state, $stateParams, mePaginator, systemPaginator, followPaginator, MessageService,$mdMedia) {
      $scope.mePaginator = mePaginator;
      $scope.systemPaginator = systemPaginator;
      $scope.followPaginator = followPaginator;
      $scope.order = MessageService.notificationCategories;
      $scope.$parent.category = 'notification';
      $scope.showSender = [false, true, false];

      $scope.$watch(function() { return $mdMedia('xs'); }, function(data) {
        $scope.screenIsSmall = data;
      });

      $scope.changeOrder = function($index) {
        $scope.order = $index;
        MessageService.notificationCategories = $scope.order;
      };

    }]);


