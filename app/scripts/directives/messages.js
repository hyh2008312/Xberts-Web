'use strict';

angular.module('xbertsApp')
  .directive('messages', ['$rootScope', 'MessageService', function($rootScope, MessageService) {
    return {
      templateUrl: 'views/directive/messages.html',
      replace: true,
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        if (!$rootScope.user.isAuth()) {
          return;
        }

        MessageService.getUnreadMessageCount();
      }
    };
  }]);
