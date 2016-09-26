'use strict';

angular.module('xbertsApp')
  .service('MessageService', ['$resource', '$rootScope', '$q', 'API_BASE_URL',
    function ($resource, $rootScope, $q, API_BASE_URL) {
      this.getMessages = function(params) {
        return $resource(API_BASE_URL + '/messages/messages/').get(params).$promise;
      };

      this.getMessage = function(messageId) {
        var message;

        return this.readMessage(messageId)
          .then(function(data) {
            message = data;

            return this.getUnreadMessageCount();
          }.bind(this))
          .then(function(data) {
            return message;
          });
      };

      this.getMessageCount = function(params) {
        var deferred = $q.defer();

        this.getMessages(params)
          .then(function(data) {
            deferred.resolve(data.count);
          })
          .catch(function(response) {
            deferred.reject(response);
          });

        return deferred.promise;
      };

      this.getUnreadMessageCount = function() {
        return this.getMessageCount({
          page_size: 1,
          direction: 'incoming',
          unread: 'True'
        })
          .then(function(count) {
            $rootScope.unreadMessageCount = count;
          });
      };

      this.readMessage = function(messageId) {
        return $resource(API_BASE_URL + '/messages/messages/' + messageId + '/read/').save().$promise;
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

      this.getThreads = function (params, direction) {
        params['direction'] = direction;

        return $resource(API_BASE_URL + '/messages/threads/').query(params).$promise;
      };

      this.getThread = function (threadId) {
        var messages;

        return $resource(API_BASE_URL + '/messages/threads/' + threadId + '/messages/').query().$promise
          .then(function(data) {
            messages = data;

            return this.readThread(threadId);
          }.bind(this))
          .then(function(data) {
            return this.getUnreadMessageCount();
          }.bind(this))
          .then(function(data) {
            return messages;
          });
      };

      this.readThread = function(threadId) {
        return $resource(API_BASE_URL + '/messages/threads/' + threadId + '/read/').save().$promise;
      };
  }]);
