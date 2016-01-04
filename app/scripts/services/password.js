'use strict';

angular.module('xbertsApp')
  .factory('PasswordService', ['$resource', 'Configuration', function($resource, Configuration) {
    function changePassword(currentPassword, newPassword) {
      return $resource(Configuration.apiBaseUrl + '/accounts/pw/', null, {
        changePassword: {
          method: 'PUT'
        }
      }).changePassword(null, {currentPassword: currentPassword, password: newPassword}).$promise;
    }

    return {
      changePassword: changePassword,
      resetPasswordRequest: $resource(Configuration.apiBaseUrl + '/accounts/resetpw/request/'),
      resetPasswordConfirm: $resource(Configuration.apiBaseUrl + '/accounts/resetpw/confirm/:uid/:token/',
        {uid: '@uid', token: '@token'})
    }
  }]);
