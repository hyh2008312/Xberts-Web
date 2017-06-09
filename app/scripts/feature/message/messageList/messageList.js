'use strict';

angular.module('xbertsApp')
  .directive('messageList',['MessageService', '$state','$rootScope','$mdMedia',
    function(MessageService, $state,$rootScope,$mdMedia) {
    return {
      restrict: 'E',
      scope: {
        messages: '=',
        mobile: '='
      },
      templateUrl: 'scripts/feature/message/messageList/message-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;
        scope.index = 0;

        scope.viewThread = function (message, $index) {
          if(scope.mobile) {
            if(!message.readAt &&  $rootScope.user.getUserId() != message.sender.id) {
              MessageService.getMessage(message.id);
            }
            scope.index = $index;
            message.readAt = true;
            $state.go('application.protected.thread', {threadId: message.thread});
          } else {
            if(!message.readAt &&  $rootScope.user.getUserId() != message.sender.id) {
              MessageService.getMessage(message.id);
            }
            scope.index = $index;
            message.readAt = true;
            $state.go('application.protected.message.inbox.thread', {threadId: message.thread});
          }
        };

        if(scope.messages.length>0 && !scope.mobile) {
          scope.viewThread(scope.messages[0],0);
        }
      }
    }
  }]);

