'use strict';

angular.module('xbertsApp')
  .service('UserResolver', ['$rootScope', '$state', '$q', 'S', 'AuthService', function($rootScope, $state, $q, S, AuthService) {
    this.resolver = function() {
      return AuthService.auth()
        .then(function() {
          // Login state has been determined at this point
          if (S($rootScope.next.state).startsWith('application.protected') && !$rootScope.user.isAuth()) {
            $rootScope.$emit('backdropOff', 'login');

            $rootScope.postLoginState = $rootScope.next;

            $state.go('application.login');
          }
        });
    };
    
    this.protectedResolver = function() {
      var deferred = $q.defer();
      
      if ($rootScope.user.isAuth()) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
      
      return deferred.promise;
    };
  }]);
