'use strict';

angular.module('xbertsApp')
  .controller('MessageNotificationCtrl', ['_', '$scope', '$state', '$stateParams', 'messagePaginator',
    function(_, $scope, $state, $stateParams, messagePaginator) {
      $scope.messagePaginator = messagePaginator;
      $scope.isEmpty = _(messagePaginator.items).isEmpty();
      $scope.$parent.category = 'notification';
      $scope.showSender = true;

      $scope.viewThread = function (threadId) {
        $state.go('application.protected.message.notificationDetail', {messageId: threadId});
        $scope.$parent.category = '';
      };

      $scope.viewContact = function (userId, $event) {
        $state.go('application.expert', {expertId: userId});
        $event.stopPropagation();
      };
    }]);


