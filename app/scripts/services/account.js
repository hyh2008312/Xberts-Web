'use strict';

angular.module('xbertsApp')
  .service('AccountService', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    this.changeEmail = function(email) {
      return $resource(API_BASE_URL + '/accounts/email/', null, {
        update: {
          method: 'PUT'
        }
      }).update({email: email}).$promise;
    };

    this.linkedinConnect = function(token) {
      return $resource(API_BASE_URL + '/accounts/linkedin/connect/', {}, {
        linkedinConnect: {
          method: 'POST',
          params: {
            token: token
          }
        }
      }).linkedinConnect().$promise;
    };

    this.requestRole = function(role) {
      return $resource(API_BASE_URL + '/accounts/rolerequests/').save({
        role: role
      }).$promise;
    };

    this.getPendingRoleRequests = function(role) {
      return $resource(API_BASE_URL + '/accounts/rolerequests/', {status: 'REQUESTED'}).query({
        role: role
      }).$promise;
    };

    this.deactivate = function() {
      return $resource(API_BASE_URL + '/accounts/deactivate/').delete().$promise;
    };
  }]);
