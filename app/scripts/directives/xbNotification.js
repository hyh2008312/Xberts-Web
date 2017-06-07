'use strict';

angular.module('xbertsApp')
  .directive('xbNotification', ['$rootScope', 'MessageResolver', 'Paginator',
    function($rootScope, MessageResolver,Paginator) {
    return {
      templateUrl: 'views/directive/xb-notification.html',
      replace: true,
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        if (!$rootScope.user.isAuth()) {
          return;
        }

        scope.isNotificationOpen = false;

        scope.showSender = true;

        scope.onNotificationUp = function() {
          scope.isNotificationOpen = !scope.isNotificationOpen;
        };

        var par = {
          name: 'xb_notification_me',
          fetchFunction: MessageResolver.getUnreadNotifications
        };
        scope.mePaginator = new Paginator(par);

        var par = {
          name: 'xb_notification_system',
          fetchFunction: MessageResolver.getUnreadNotifications
        };
        scope.systemPaginator = new Paginator(par);

        var par = {
          name: 'xb_notification_following',
          fetchFunction: MessageResolver.getUnreadNotifications
        };
        scope.followPaginator = new Paginator(par);
        scope.mePaginator.load();
        scope.systemPaginator.load();
        scope.followPaginator.load();

        scope.me = function() {
          scope.mePaginator.load();
        };

        scope.system = function() {
          scope.systemPaginator.load();
        };

        scope.follow = function() {
          scope.followPaginator.load();
        };
      }
    };
  }]);
