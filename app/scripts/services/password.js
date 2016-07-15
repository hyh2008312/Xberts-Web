'use strict';

angular.module('xbertsApp')
  .factory('PasswordService', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {
    function changePassword(currentPassword, newPassword) {
      return $resource(API_BASE_URL + '/accounts/pw/', null, {
        changePassword: {
          method: 'PUT'
        }
      }).changePassword(null, {currentPassword: currentPassword, password: newPassword}).$promise;
    }

    return {
      changePassword: changePassword,
      resetPasswordRequest: $resource(API_BASE_URL + '/accounts/resetpw/request/'),
      resetPasswordConfirm: $resource(API_BASE_URL + '/accounts/resetpw/confirm/:uid/:token/',
        {uid: '@uid', token: '@token'})
    }
  }]);
