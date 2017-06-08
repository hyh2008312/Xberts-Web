'use strict';

angular.module('xbertsApp')
  .directive('messageList',['MessageService', '$state',
    function(MessageService, $state) {
    return {
      restrict: 'E',
      scope: {
        messages:'='
      },
      templateUrl: 'scripts/feature/message/messageList/message-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.index = 0;

        scope.viewThread = function (message, $index) {
          if(!message.readAt) {
            MessageService.getMessage(message.id);
          }
          scope.index = $index;
          message.readAt = true;
          $state.go('application.protected.message.inbox.thread', {threadId: message.thread});
        };

        if(scope.messages.length>0) {
          scope.viewThread(scope.messages[0],0);
        }
      }
    }
  }]);

