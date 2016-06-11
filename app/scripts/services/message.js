'use strict';

angular.module('xbertsApp')
  .service('MessageService', ['$resource', 'Configuration', function ($resource, Configuration) {
    this.getMessages = function (params, direction) {
      params['direction'] = direction;

      return $resource(Configuration.apiBaseUrl + '/messages/messages/').query(params).$promise;
    };

    this.sendMessage = function (recipientId, subject, body, threadId, parentId) {
      var params = {
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

      return $resource(Configuration.apiBaseUrl + '/messages/compose/').save(params).$promise;
    };

    this.getThread = function (threadId) {
      return $resource(Configuration.apiBaseUrl + '/messages/thread/' + threadId + '/').query().$promise;
    };
  }]);
