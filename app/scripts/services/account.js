'use strict';

angular.module('xbertsApp')
  .factory('AccountService', ['$resource', 'Configuration', function($resource, Configuration) {
    function changeEmail(email) {
      return $resource(Configuration.apiBaseUrl + '/accounts/email/', null, {
        update: {
          method: 'PUT'
        }
      }).update({email: email}).$promise;
    }

    function deactivate() {
      return $resource(Configuration.apiBaseUrl + '/accounts/deactivate/').delete().$promise;
    }

    return {
      changeEmail: changeEmail,
      deactivate: deactivate
    };
  }]);
