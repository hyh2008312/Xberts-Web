'use strict';

angular.module('xbertsApp')
  .service('AccountService', ['$resource', 'Configuration', function($resource, Configuration) {
    this.changeEmail = function(email) {
      return $resource(Configuration.apiBaseUrl + '/accounts/email/', null, {
        update: {
          method: 'PUT'
        }
      }).update({email: email}).$promise;
    };

    this.linkedinConnect = function(token) {
      return $resource(Configuration.apiBaseUrl + '/accounts/linkedin/connect/', {}, {
        linkedinConnect: {
          method: 'POST',
          params: {
            token: token
          }
        }
      }).linkedinConnect().$promise;
    };

    this.requestRole = function(role) {
      return $resource(Configuration.apiBaseUrl + '/accounts/rolerequests/').save({
        role: role
      }).$promise;
    };

    this.getPendingRoleRequests = function(role) {
      return $resource(Configuration.apiBaseUrl + '/accounts/rolerequests/', {status: 'REQUESTED'}).query({
        role: role
      }).$promise;
    };

    this.deactivate = function() {
      return $resource(Configuration.apiBaseUrl + '/accounts/deactivate/').delete().$promise;
    };
  }]);
