'use strict';

angular.module('xbertsApp')
  .controller('SendMessageCtrl', ['$rootScope', '$scope', 'recipientId', 'MessageService',
    function($rootScope, $scope, recipientId, MessageService) {
      $scope.sendMessage = function() {
        if (!$scope.sendMessageForm.$valid) {
          return;
        }

        $scope.$emit('backdropOn', 'sendMessage');
        $scope.sendMessageForm.serverError = {};

        MessageService.sendMessage($rootScope.user.getUserId(), recipientId, $scope.data.subject, $scope.data.body,
          null, null)
          .then(function() {
            $scope.$emit('backdropOff', 'sendMessageSuccess');

            $scope.$close();
          })
          .catch(function(response) {
            $scope.$emit('backdropOff', 'sendMessageError');

            $scope.changePasswordForm.serverError.generic = true;
          });
      };
  }]);
