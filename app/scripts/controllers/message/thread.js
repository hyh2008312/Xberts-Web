'use strict';

angular.module('xbertsApp')
  .controller('MessageThreadCtrl', ['_', '$scope', '$rootScope', '$state', '$stateParams', 'messages', 'MessageService',
    '$mdMedia',
    function (_, $scope, $rootScope, $state, $stateParams, messages, MessageService,$mdMedia) {
      $scope.messages = messages;
      $scope.firstMessage = _(messages).first();

      if ($scope.firstMessage.sender.id === $rootScope.user.getUserId()) {
        var recipientId = $scope.firstMessage.recipient.id;
      } else {
        var recipientId = $scope.firstMessage.sender.id;
      }

      var lastReceived = _.chain(messages)
        .filter(function (message) { return message.sender.id !== $rootScope.user.getUserId(); })
        .last()
        .value();
      if (lastReceived) {
        var parentId = lastReceived.id;
      } else {
        var parentId = null;
      }

      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        //you also get the actual event object
        //do stuff, execute functions -- whatever...
        if(!$mdMedia('xs')) {
          var item = document.getElementsByClassName('xb-scroll-into-view')[0];
        } else {
          var item = document.getElementsByClassName('xb-body-view')[0];
        }

        item.scrollTop = item.scrollHeight;
      });

      $scope.replyMessage = function () {
        if (!$scope.replyForm.$valid) {
          return;
        }

        $scope.$emit('backdropOn', 'replyMessage');
        $scope.replyForm.serverError = {};

        MessageService.sendMessage($rootScope.user.getUserId(), recipientId, null,
          $scope.data.body, $scope.firstMessage.thread, parentId)
          .then(function() {
            $scope.$emit('backdropOff', 'replyMessageSuccess');

            $state.reload();
          })
          .catch(function(response) {
            $scope.$emit('backdropOff', 'replyMessageError');

            $scope.replyForm.serverError.generic = true;
          });
      };
  }]);
