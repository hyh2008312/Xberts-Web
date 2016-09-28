'use strict';

angular.module('xbertsApp')
  .service('MessageResolver', ['MessageService', function (MessageService) {
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
      param.category = ['PRODUCT_INQUIRY', 'FEEDBACK', 'COMMENT', 'LIKE', 'CONFIRM_ADDRESS',
        'CONFIRM_ADDRESS_REMINDER', 'REVIEW_APPLICATION', 'REVIEW_SELECTION_ANNOUNCEMENT',
        'REVIEW_SELECTION_REVOKE', 'REPORT_CHECK_IN', 'REPORT_REMINDER', 'REPORT_PAST_DUE',
        'SHIPPING_NOTIFICATION'];
      param.direction = 'incoming';
      return MessageService.getMessages(param);
    };

    this.viewNotification = function($stateParams) {
      return MessageService.getMessage($stateParams['messageId']);
    };
  }]);
