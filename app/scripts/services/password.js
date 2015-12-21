'use strict';

angular.module('xbertsApp')
  .factory('PasswordService', ['$resource', function($resource) {
    function changePassword(currentPassword, newPassword) {
      return $resource('/accounts/pw/', null, {
        changePassword: {
          method: 'PUT'
        }
      }).changePassword(null, {currentPassword: currentPassword, password: newPassword}).$promise;
    }

    return {
      changePassword: changePassword,
      resetPasswordRequest: $resource('/accounts/resetpw/request/'),
      resetPasswordConfirm: $resource('/accounts/resetpw/confirm/:uid/:token/', {uid:'@uid', token:'@token'})
    }
  }]);
