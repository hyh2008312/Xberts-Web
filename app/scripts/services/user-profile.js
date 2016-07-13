'use strict';

angular.module('xbertsApp')
  .service('UserProfileService', ['$q', '$resource', 'API_BASE_URL', 'UploadMultiForm',
    function($q, $resource, API_BASE_URL, UploadMultiForm) {
      var userProfileResource = $resource(API_BASE_URL + '/accounts/userprofile/', {}, {
        update: {
          method: 'PUT'
        }
      });

      this.updateAvatar = function(avatar) {
        return UploadMultiForm(
          API_BASE_URL + '/accounts/userprofile/avatar/',
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
