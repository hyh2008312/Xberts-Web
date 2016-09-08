'use strict';

angular.module('xbertsApp')
  .service('MessageService', ['$resource', 'API_BASE_URL', function ($resource, API_BASE_URL) {
    this.getMessages = function (params, direction) {
      params['direction'] = direction;

      return $resource(API_BASE_URL + '/messages/threads/').query(params).$promise;
    };

    this.sendMessage = function (senderId, recipientId, subject, body, threadId, parentId) {
      var params = {
        sender: senderId,
        recipient: recipientId,
        subject: subject,
        body: body
      };

      if (threadId) {
        params['thread'] = threadId;
      }
      if (parentId) {
        params['parent'] = parentId;
      }

      return $resource(API_BASE_URL + '/messages/messages/').save(params).$promise;
    };

    this.getThread = function (threadId) {
      return $resource(API_BASE_URL + '/messages/thread/' + threadId + '/messages/').query().$promise;
    };
  }]);
