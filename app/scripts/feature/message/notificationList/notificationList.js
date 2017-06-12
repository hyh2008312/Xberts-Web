'use strict';

angular.module('xbertsApp')
  .directive('notificationList',['MessageService', '$location', 'urlParser','$rootScope','$state',
    function(MessageService,$location,urlParser,$rootScope,$state) {
    return {
      restrict: 'E',
      scope: {
        notifications:'=',
        showSender: '=',
        redPoint: '=',
        system: '=',
        onMenuClose: '&',
        unread: '='
      },
      templateUrl: 'scripts/feature/message/notificationList/notification-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;
        scope.viewThread = function (message) {
          if(!message.readAt && !scope.unread) {
            message.readAt = true;
            MessageService.getMessage(message.id);
          }

          if(scope.onMenuClose) {
            scope.onMenuClose();
          }

          if(!scope.unread) {
            $location.path(urlParser.parse(message.actionUrl).pathname);
          } else {
            $state.go('application.protected.message.notification',{},{reload:true});
          }

        };
      }
    }
  }]);

