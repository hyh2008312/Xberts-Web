'use strict';

angular.module('xbertsApp')
  .directive('xbNotification', ['$rootScope', 'MessageResolver', 'Paginator','MessageService','$state',
    function($rootScope, MessageResolver,Paginator,MessageService,$state) {
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
          params: {
            type: 'Me'
          },
          fetchFunction: MessageResolver.getUnreadNotifications
        };
        scope.mePaginator = new Paginator(par);

        var par = {
          name: 'xb_notification_system',
          params: {
            type: 'System'
          },
          fetchFunction: MessageResolver.getUnreadNotifications
        };
        scope.systemPaginator = new Paginator(par);

        var par = {
          name: 'xb_notification_following',
          params: {
            type: 'Feeds'
          },
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

        scope.closeMenu = function(index) {
          scope.isNotificationOpen = false;
          switch (index) {
            case 0:
              scope.mePaginator.clear();
              break;
            case 1:
              scope.systemPaginator.clear();
              break;
            case 2:
              scope.followPaginator.clear();
              break;
          }
          MessageService.notificationCategories = index;
        };

        scope.jumpToNotification = function($index) {
          scope.isNotificationOpen = false;
          MessageService.notificationCategories = $index;
          $state.go('application.protected.message.notification',{},{reload:true});
        };
      }
    };
  }]);
