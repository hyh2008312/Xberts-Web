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
  }]);
