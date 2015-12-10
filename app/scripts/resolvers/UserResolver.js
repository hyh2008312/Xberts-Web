'use strict';

angular.module('xbertsApp')
  .factory('UserResolver', ['AuthService', function(AuthService) {
    return {
      resolver: function() {
        return AuthService.user.get().$promise
          .then(function(value, responseHeaders) {
            AuthService.setUser(value);
          })
          .catch(function(httpResponse) {
            // Fail to get user means user is not logged in
            // No-opt
          });
      }
    }
  }]);
