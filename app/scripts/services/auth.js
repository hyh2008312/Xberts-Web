'use strict';

angular.module('xbertsApp')
  .factory('AuthService', ['$rootScope', '$resource', '$state', '$q', '_', 'Configuration', 'OAuthToken',
    'SystemConstant',
    function($rootScope, $resource, $state, $q, _, Configuration, OAuthToken,
             SystemConstant) {
      function User(userId, firstName, lastName, userEmail, userType, userAvatar, isLinkedinSignup, isLinkedinConnected,
                    roles, isResolved) {
        this._userId = userId || '';
        this._firstName = firstName || '';
        this._lastName = lastName || '';
        this._userEmail = userEmail || '';
        this._userType = userType || false;
        this._userAvatar = userAvatar || '/images/empty-avater.gif';
        this._isLinkedinSignup = isLinkedinSignup || false;
        this._isLinkedinConnected = isLinkedinConnected || false;
        this._roles = roles || [];
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
          return this._firstName + ' ' + this._lastName;
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

        this.isLinkedinSignup = function() {
          return this._isLinkedinSignup;
        };

        this.isLinkedinConnected = function() {
          return this._isLinkedinConnected;
        };

        this.getRoles = function() {
          return this._roles;
        };

        this.hasRole = function(role) {
          return _(this.getRoles()).contains(role);
        };

        this.isExpert = function() {
          return this.hasRole(SystemConstant.ROLES.DOMAIN_EXPERT);
        };

        this.isResolved = function() {
          return this._isResolved;
        };

        this.setFirstName = function(firstName) {
          this._firstName = firstName;
        };

        this.setLastName = function(lastName) {
          this._lastName = lastName;
        };

        this.setUserEmail = function(userEmail) {
          this._userEmail = userEmail;
        };

        this.setUserAvatar = function(userAvatar) {
          this._userAvatar = userAvatar;
        };

        this.setLinkedinConnected = function(linkedinConnected) {
          this._isLinkedinConnected = linkedinConnected;
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
        $rootScope.user = new User(user.id, user.firstName, user.lastName, user.email, user.isStaff, user.avatar,
          user.isLinkedinSignup, user.isLinkedinConnected, user.roles, true);
      }

      function login(credentials) {
        return $resource(Configuration.apiBaseUrl + '/oauth2/token/', {}, {
          getToken: {
            method: 'POST',
            params: {
              grant_type: 'password',
              client_id: Configuration.oauthClientId,
              username: credentials.username,
              password: credentials.password
            }
          }
        }).getToken().$promise.then(function(value) {
          return postLogin(value);
        });
      }

      function exchangeLinkedinToken(accessToken) {
        return $resource(Configuration.apiBaseUrl + '/oauth2/convert-token/', {}, {
          exchangeToken: {
            method: 'POST',
            params: {
              grant_type: 'convert_token',
              client_id: Configuration.oauthClientId,
              backend: 'linkedin-oauth2',
              token: accessToken
            }
          }
        }).exchangeToken().$promise
          .then(function(value) {
            return postLogin(value);
          });
      }

      function createUserWithDefaultPasswordPromise(user){

      }

      function loginComplete() {
        return $resource(Configuration.apiBaseUrl + '/accounts/login/complete/', {}, {
          loginComplete: {
            method: 'PUT'
          }
        }).loginComplete().$promise;
      }

      function postLogin(token) {
        OAuthToken.setToken(token);

        return loginComplete()
          .then(function() {
            return fetchUser();
          })
          .then(function(value) {
            setUser(value);
          });
      }

      function loginRedirect() {
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

        var token = OAuthToken.getAccessToken();
        OAuthToken.removeToken();

        if (!shouldMakeApiCall) {
          var deferred = $q.defer();

          deferred.resolve();

          return deferred.promise;
        } else {
          return $resource(Configuration.apiBaseUrl + '/oauth2/revoke-token/', {}, {
            revokeToken: {
              method: 'POST',
              params: {
                client_id: Configuration.oauthClientId,
                token: token
              }
            }
          }).revokeToken().$promise
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
            .then(function(value) {
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
        exchangeLinkedinToken: exchangeLinkedinToken,
        auth: auth,
        setUser: setUser,
        loginRedirect: loginRedirect,
        logout: logout
      };
    }]);
