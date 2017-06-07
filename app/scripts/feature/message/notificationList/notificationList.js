'use strict';

angular.module('xbertsApp')
  .directive('notificationList',[function() {
    return {
      restrict: 'E',
      scope: {
        notifications:'=',
        showSender: '=',
        redPoint: '='
      },
      templateUrl: 'scripts/feature/message/notificationList/notification-list.html',
      link: function (scope, element, attrs, ctrls) {

      }
    }
  }]);

