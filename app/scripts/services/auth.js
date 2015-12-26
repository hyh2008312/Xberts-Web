'use strict';

angular.module('xbertsApp')
  .factory('AuthService', ['$rootScope', '$resource', '$state', '$q', 'Configuration',
    function($rootScope, $resource, $state, $q, Configuration) {
      function User(userId, userName, userEmail, userType, userAvatar, isResolved) {
        this._userId = userId || '';
        this._userName = userName || '';
        this._userEmail = userEmail || '';
        this._userType = userType || false;
        this._userAvatar = userAvatar || '';
        // Indicate whether login state has been fetched from backend
        this._isResolved = isResolved || false;

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

        this.isResolved = function() {
          return this._isResolved;
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

        this.setIsResolved = function(isResolved) {
          this._isResolved = isResolved;
        };

        this.authRequired = function() {
          if (this.isAuth()) {
            return true;
          } else {
            $rootScope.postLoginState = $rootScope.next;

            $state.go('application.login');
            return false;
          }
        };
      }

      function setUser(user) {
        $rootScope.user = new User(user.id, user.fullName, user.email, user.isStaff, user.avatar, true);
      }

      function createAuthHeader(credentials) {
        return 'Basic ' + btoa(credentials.username + ':' + credentials.password);
      }

      function login(credentials, params) {
        return $resource(Configuration.apiBaseUrl + '/accounts/auth/', {}, {
          auth: {
            method: 'POST',
            params: params,
            headers: {
              Authorization: createAuthHeader(credentials)
            }
          }
        });
      }

      function createUserWithDefaultPasswordPromise(user){

      }

      function postLogin(user) {
        setUser(user);

        $rootScope.$emit('backdropOff', 'success');

        if ($rootScope.postLoginState) {
          $state.go($rootScope.postLoginState.state, $rootScope.postLoginState.params);

          $rootScope.postLoginState = null;
        } else {
          $state.go('application.main')
        }
      }

      function logout(shouldMakeApiCall) {
        $rootScope.user = new User();
        $rootScope.user.setIsResolved(true);

        if (!shouldMakeApiCall) {
          var deferred = $q.defer();

          deferred.resolve();

          return deferred.promise;
        } else {
          return $resource(Configuration.apiBaseUrl + '/accounts/logout/').delete().$promise
        }
      }

      function fetchUser() {
        return $resource(Configuration.apiBaseUrl + '/accounts/user/').get().$promise;
      }

      function auth() {
        var deferred = $q.defer();

        if ($rootScope.user && $rootScope.user.isResolved()) {
          deferred.resolve();
        } else {
          fetchUser()
            .then(function(value, responseHeaders) {
              setUser(value);

              deferred.resolve();
            })
            .catch(function(httpResponse) {
              // Fail to get user means user is not logged in
              $rootScope.user.setIsResolved(true);

              deferred.resolve();
            });
        }

        return deferred.promise;
      }

      $rootScope.user = new User();

      return {
        login: login,
        auth: auth,
        setUser: setUser,
        postLogin: postLogin,
        logout: logout
      };
    }]);
