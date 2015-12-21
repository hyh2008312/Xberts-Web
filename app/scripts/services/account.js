'use strict';

angular.module('xbertsApp')
  .factory('AccountService', ['$resource', function($resource) {
    function changeEmail(email) {
      return $resource('/accounts/email/', null, {
        update: {
          method: 'PUT'
        }
      }).update({email: email}).$promise;
    }

    function deactivate() {
      return $resource('/accounts/deactivate/').delete().$promise;
    }

    return {
      changeEmail: changeEmail,
      deactivate: deactivate
    };
  }]);
