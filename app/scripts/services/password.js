'use strict';

angular.module('xbertsApp')
  .factory('PasswordService', ['$resource', function($resource) {
    return {
      resetPasswordRequest: $resource('/accounts/resetpw/request/', {}),
      resetPasswordConfirm: $resource('/accounts/resetpw/confirm/:uid/:token/', {uid:'@uid', token:'@token'})
    }
  }]);
