'use strict';

angular.module('xbertsApp')
  .controller('MessageNotificationCtrl', ['$scope', '$state', '$stateParams', 'messagePaginator',
    function($scope, $state, $stateParams, messagePaginator) {
      $scope.messagePaginator = messagePaginator;
      $scope.order = 0;
      $scope.showSender = [false, true, false];

      $scope.viewThread = function (threadId) {
        $state.go('application.protected.message.notificationDetail', {messageId: threadId});
        $scope.$parent.category = '';
      };

      $scope.changeMeNotification = function() {
        $scope.order = 0;
      };
      $scope.changeSystemNotification = function() {
        $scope.order = 1;
      };
      $scope.changeFollowNotification = function() {
        $scope.order = 2;
      };
    }]);


