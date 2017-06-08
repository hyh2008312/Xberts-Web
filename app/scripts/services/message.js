'use strict';

angular.module('xbertsApp')
  .service('MessageService', ['$resource', '$rootScope', '$q', 'API_BASE_URL', 'Configuration',
    function ($resource, $rootScope, $q, API_BASE_URL, Configuration) {
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
        var param = {
          page_size: 1,
          direction: 'incoming',
          unread: 'True'
        };

        var directParam = {};
        angular.copy(param, directParam);
        directParam.category = ['DIRECT'];

        var notificationParam = {};
        angular.copy(param, notificationParam);
        notificationParam.category = Configuration.notificationCategories;

        return this.getMessageCount(directParam)
          .then(function(count) {
            $rootScope.unreadDirectMessageCount = count;

            return this.getMessageCount(notificationParam);
          }.bind(this))
          .then(function(count) {
            $rootScope.unreadNotificationMessageCount = count;
            $rootScope.unreadMessageCount = $rootScope.unreadDirectMessageCount +
              $rootScope.unreadNotificationMessageCount;
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

      this.notificationCategories = 0;
  }]);
