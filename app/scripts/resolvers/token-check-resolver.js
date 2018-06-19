'use strict';

angular.module('xbertsApp')
  .factory('TokenCheckResolver', ['PasswordService', function(PasswordService) {
    return {
      resolver: function(uid, token) {
        return PasswordService.resetPasswordConfirm.get({uid: uid, token: token}).$promise;
      }
    };
  }]);
