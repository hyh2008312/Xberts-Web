'use strict';

angular.module('xbertsApp')
  .service('MessageResolver', ['MessageService', 'Configuration',
    function (MessageService, Configuration) {
    this.getThreads = function () {
      return MessageService.getThreads();
    };

    this.viewThread = function ($stateParams) {
      return MessageService.getThread($stateParams['threadId']);
    };

    this.getNotifications = function(param) {
      param.page_size = 10;
      param.direction = 'incoming';
      return MessageService.getMessages(param);
    };

    this.getUnreadNotifications = function(param) {
      param.page_size = 3;
      param.unread = 'True';
      param.direction = 'incoming';
      return MessageService.getMessages(param);
    };

    this.viewNotification = function($stateParams) {
      return MessageService.getMessage($stateParams['messageId']);
    };
  }]);
