'use strict';

angular.module('xbertsApp')
  .factory('UserProfileService', ['$resource', 'Configuration', 'UploadMultiForm',
    function($resource, Configuration, UploadMultiForm) {
      function updateProfile(userProfile, successCallback, errorCallback) {
        UploadMultiForm(
          Configuration.apiBaseUrl + '/accounts/userprofile/',
          'PUT',
          userProfile,
          successCallback,
          errorCallback
        ).upload()
      }

      return {
        userProfile: $resource(Configuration.apiBaseUrl + '/accounts/userprofile/', {}),
        updateProfile: updateProfile
      };
    }]);
