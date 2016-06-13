'use strict';

angular.module('xbertsApp')
  .controller('MessageInboxCtrl', ['_', '$scope', '$state', '$stateParams', 'messages',
    function(_, $scope, $state, $stateParams, messages) {
      $scope.messages = messages;
      $scope.isEmpty = _(messages).isEmpty();

      if ($stateParams['direction'] === 'outgoing') {
        $scope.$parent.category = 'outgoing';
        $scope.showSender = false;
      } else {
        $scope.$parent.category = 'incoming';
        $scope.showSender = true;
      }

      $scope.viewThread = function (threadId) {
        $state.go('application.protected.message.thread', {threadId: threadId});
        $scope.$parent.category = '';
      };

      $scope.viewContact = function (userId, $event) {
        $state.go('application.expert', {expertId: userId});
        $event.stopPropagation();
      };
  }]);
