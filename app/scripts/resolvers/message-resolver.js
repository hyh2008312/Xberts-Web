'use strict';

angular.module('xbertsApp')
  .service('MessageResolver', ['MessageService', 'Configuration', function (MessageService, Configuration) {
    this.getThreads = function ($stateParams) {
      var direction = 'incoming';
      if ($stateParams['direction'] === 'outgoing') {
        direction = 'outgoing';
      }

      return MessageService.getThreads({}, direction);
    };

    this.viewThread = function ($stateParams) {
      return MessageService.getThread($stateParams['threadId']);
    };

    this.getNotifications = function(param) {
      param.page_size = 10;
      param.category = Configuration.notificationCategories;
      param.direction = 'incoming';
      return MessageService.getMessages(param);
    };

    this.getUnreadNotifications = function(param) {
      param.page_size = 3;
      param.category = Configuration.notificationCategories;
      param.direction = 'incoming';
      param.unread = 'True';
      return MessageService.getMessages(param);
    };

    this.viewNotification = function($stateParams) {
      return MessageService.getMessage($stateParams['messageId']);
    };
  }]);
