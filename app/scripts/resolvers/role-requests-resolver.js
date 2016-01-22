'use strict';

angular.module('xbertsApp')
  .service('RoleRequestsResolver', ['$rootScope', 'AccountService', function($rootScope, AccountService) {
    this.resolver = function(role) {
      if (!$rootScope.user.isAuth()) {
        return [];
      }

      return AccountService.getPendingRoleRequests(role)
        .then(function(value) {
          return value;
        })
        .catch(function(httpResponse) {
          // TODO: redirect to error page
        });
    };
  }]);
