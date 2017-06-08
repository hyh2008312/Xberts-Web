'use strict';

angular.module('xbertsApp')
  .directive('notificationItem',['MessageService', '$location', 'urlParser',
    function(MessageService,$location,urlParser) {
    return {
      restrict: 'E',
      scope: {
        notification:'='
      },
      templateUrl: 'scripts/feature/message/notificationItem/notification-item.html',
      link: function (scope, element, attrs, ctrls) {
        scope.viewThread = function (message) {
          if(!message.readAt) {
            MessageService.getMessage(message.id);
          }
          $location.path(urlParser.parse(message.actionUrl).pathname);
        };
      }
    }
  }]);

