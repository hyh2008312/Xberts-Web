'use strict';

angular.module('xbertsApp')
  .factory('UserProfileResolver', ['UserProfileService', function(UserProfileService) {
    return {
      resolver: function() {
        return UserProfileService.userProfile.get().$promise
          .then(function(value, responseHeaders) {
            return value;
          })
          .catch(function(httpResponse) {
            // TODO: redirect to error page
          });
      }
    }
  }]);
