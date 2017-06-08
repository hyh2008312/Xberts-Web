'use strict';

angular.module('xbertsApp')
  .directive('notificationList',['MessageService', '$location', 'urlParser',
    function(MessageService,$location,urlParser) {
    return {
      restrict: 'E',
      scope: {
        notifications:'=',
        showSender: '=',
        redPoint: '='
      },
      templateUrl: 'scripts/feature/message/notificationList/notification-list.html',
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

