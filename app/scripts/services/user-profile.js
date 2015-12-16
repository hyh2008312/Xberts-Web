'use strict';

angular.module('xbertsApp')
  .factory('UserProfileService', ['$resource', 'UploadMultiForm', function($resource, UploadMultiForm) {
    function updateProfile(userProfile, successCallback, errorCallback) {
      UploadMultiForm(
        '/accounts/userprofile/',
        'PUT',
        userProfile,
        successCallback,
        errorCallback
      ).upload()
    }

    return {
      userProfile: $resource('/accounts/userprofile/', {}),
      updateProfile: updateProfile
    };
  }]);
