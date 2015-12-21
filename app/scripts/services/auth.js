'use strict';

angular.module('xbertsApp')
  .factory('AuthService', ['$rootScope', '$resource','$state', '$q', function ($rootScope, $resource, $state, $q) {
    function User(userId, userName, userEmail, userType, userAvatar) {
      this._userId = userId || '';
      this._userName = userName || '';
      this._userEmail = userEmail || '';
      this._userType = userType || false;
      this._userAvatar = userAvatar || '';

      this.isAuth = function() {
        return this._userId ? true : false;
      };

      this.isStaff = function() {
        return this._userType;
      };

      this.getUserId = function() {
        return this._userId;
      };

      this.getUserName = function() {
        return this._userName;
      };

      this.getUserEmail = function() {
        return this._userEmail;
      };

      this.getUserType = function() {
        return this._userType;
      };

      this.getUserAvatar = function() {
        return this._userAvatar;
      };

      this.setUserName = function(userName) {
        this._userName = userName;
      };

      this.setUserEmail = function(userEmail) {
        this._userEmail = userEmail;
      };

      this.setUserAvatar = function(userAvatar) {
        this._userAvatar = userAvatar;
      };

      this.authRequired = function() {
        if (this.isAuth()) {
          return true;
        } else {
          $rootScope.next = {
            state: $state.$current.name,
            params: $state.params
          };

          $state.go('application.login');
          return false;
        }
      };
    }

    function setUser(user) {
      $rootScope.user = new User(user.id, user.fullName, user.email, user.isStaff, user.avatar);
    }

    function createAuthHeader(credentials) {
      return 'Basic ' + btoa(credentials.username + ':' + credentials.password);
    }

    function login(credentials, params) {
      return $resource('/accounts/auth/', {}, {
        auth: {
          method: 'POST',
          params: params,
          headers: {
            Authorization: createAuthHeader(credentials)
          }
        }
      });
    }

    function postLogin(user) {
      setUser(user);

      $rootScope.$emit('backdropOff', 'success');

      if ($rootScope.next) {
        $state.go($rootScope.next.state, $rootScope.next.params);

        $rootScope.next = null;
      } else {
        $state.go('application.main')
      }
    }

    function logout(shouldMakeApiCall) {
      $rootScope.user = new User();

      if (!shouldMakeApiCall) {
        var deferred = $q.defer();

        deferred.resolve();

        return deferred.promise;
      } else {
        return $resource('/accounts/logout/').delete().$promise
      }
    }

    $rootScope.user = new User();

    return {
      login: login,
      user: $resource('/accounts/user/', {}),
      setUser: setUser,
      postLogin: postLogin,
      logout: logout
    };
  }]);
