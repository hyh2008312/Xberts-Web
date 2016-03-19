'use strict';

angular.module('xbertsApp')
  .factory('UserResolver', ['$rootScope', '$state', '$q', 'S', 'AuthService', function($rootScope, $state, $q, S, AuthService) {
    return {
      resolver: function() {
        return AuthService.auth()
          .then(function() {
            // Login state has been determined at this point
            if (S($rootScope.next.state).startsWith('application.protected') && !$rootScope.user.isAuth()) {
              $rootScope.$emit('backdropOff', 'login');

              $rootScope.postLoginState = $rootScope.next;

              $state.go('application.login');
            }
          });
      }
    }
  }]);
