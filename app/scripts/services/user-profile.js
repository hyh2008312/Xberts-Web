'use strict';

angular.module('xbertsApp')
  .service('UserProfileService', ['$q', '$resource', 'Configuration', 'UploadMultiForm',
    function($q, $resource, Configuration, UploadMultiForm) {
      var userProfileResource = $resource(Configuration.apiBaseUrl + '/accounts/userprofile/', {}, {
        update: {
          method: 'PUT'
        }
      });

      this.updateAvatar = function(avatar) {
        return UploadMultiForm(
          Configuration.apiBaseUrl + '/accounts/userprofile/avatar/',
          'PUT',
          avatar
        ).upload();
      };

      this.getUserProfile = function() {
        return userProfileResource.get().$promise;
      };

      this.updateProfile = function(userProfile) {
        return userProfileResource.update(userProfile).$promise;
      };
    }]);
