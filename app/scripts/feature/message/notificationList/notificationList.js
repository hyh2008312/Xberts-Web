'use strict';

angular.module('xbertsApp')
  .directive('notificationList',['MessageService', '$location', 'urlParser','$rootScope',
    function(MessageService,$location,urlParser,$rootScope) {
    return {
      restrict: 'E',
      scope: {
        notifications:'=',
        showSender: '=',
        redPoint: '=',
        system: '='
      },
      templateUrl: 'scripts/feature/message/notificationList/notification-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;
        scope.viewThread = function (message) {
          if(!message.readAt) {
            MessageService.getMessage(message.id);
          }

          $location.path(urlParser.parse(message.actionUrl).pathname);
        };
      }
    }
  }]);

