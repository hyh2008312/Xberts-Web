'use strict';

angular.module('xbertsApp')
  .factory('AuthService', ['$rootScope', '$resource', '$state', '$q', '$httpParamSerializer', '$location',
    '_', 'Configuration', 'OAuthToken', 'SystemConstant', 'randomString', 'localStorageService', 'Idle', 'API_BASE_URL',
    'OAUTH_CLIENT_ID','$mdDialog','AnalyticsService','$window',
    function($rootScope, $resource, $state, $q, $httpParamSerializer, $location,
             _, Configuration, OAuthToken, SystemConstant, randomString, localStorageService, Idle, API_BASE_URL,
             OAUTH_CLIENT_ID, $mdDialog, AnalyticsService,$window) {
      function User(userId, firstName, lastName, userEmail, userType, userAvatar, isLinkedinSignup, isLinkedinConnected,
                    roles, isResolved, inviteToken, points, consumed) {
        this._userId = userId || '';
        this._firstName = firstName || '';
        this._lastName = lastName || '';
        this._userEmail = userEmail || '';
        this._userType = userType || false;
        this._userAvatar = userAvatar;
        this._isLinkedinSignup = isLinkedinSignup || false;
        this._isLinkedinConnected = isLinkedinConnected || false;
        this._roles = roles || [];
        // Indicate whether login state has been fetched from backend
        this._isResolved = isResolved || false;
        this._inviteToken = inviteToken || '';
        this._points = points || '';
        this._consumed = consumed || '';

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
          return this._userAvatar || false;
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

        this.getInviteLink = function() {
          return $location.protocol() + '://' + location.host + $state.href('application.testingcampaigns') +
            '?source=userrefer_' + this._inviteToken;
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

        this.authRequired = function(obj,ev) {
          if (this.isAuth()) {
            return true;
          } else {
            if(angular.element($window).width() > 600) {
              $mdDialog.show({
                controller: function(scope, $mdDialog) {
                  $rootScope.postLoginState = $rootScope.next;
                  scope.cancel = function() {
                    $mdDialog.cancel();
                  };
                  scope.login = function(form) {
                    if (!scope.loginForm.$valid) {
                      return;
                    }
                    scope.$emit('backdropOn', 'post');

                    AnalyticsService.sendPageView($location.path() + '/confirm');

                    form.serverError = {};

                    login({username: scope.username, password: scope.password})
                      .then(function(value) {
                        $mdDialog.cancel();
                        loginRedirect(obj);
                        scope.$emit('backdropOff', 'success');
                      })
                      .catch(
                        function(httpResponse) {
                          scope.$emit('backdropOff', 'error');
                          if (httpResponse.status === 401 || httpResponse.status === 403) {
                            form.serverError = {invalidCredentials: true};
                          } else if (httpResponse.status === 400 && httpResponse.data.error === 'linkedin_signup') {
                            form.serverError = {linkedinSignup: true};
                          } else {
                            form.serverError = {generic: true};
                          }
                        });
                  };

                  scope.facebookLogin = function(loginError) {
                    scope.$emit('backdropOn', 'post');

                    AnalyticsService.sendPageView('/facebooklogin');

                    facebookLogin()
                      .then(function (response) {
                        $mdDialog.cancel();
                        loginRedirect();
                      })
                      .catch(function (response) {
                        scope.$emit('backdropOff', 'error');

                        if (response === 'missing_permission') {
                          loginError.facebookPermissionError = true;
                        } else {
                          loginError.facebookError = true;
                        }
                      });
                  };

                  scope.linkedinLogin = function() {
                    scope.$emit('backdropOn', 'post');

                    AnalyticsService.sendPageView('/linkedinlogin');

                    linkedinLogin();
                  };
                },
                templateUrl: 'scripts/feature/login/login.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                disableParenScroll: true
              });
            } else {
              $state.go('application.login');
            }
            return false;
          }
        };

        this.getPoints = function() {
          return this._points;
        };

        this.setPoints = function(points) {
          this._points = points;
        };

        this.getConsumedPoints = function() {
          return this._consumed;
        };

        this.setConsumedPoints = function(consumed) {
          this._consumed = consumed;
        };
      }

      function setUser(user) {
        $rootScope.user = new User(user.id, user.firstName, user.lastName, user.email, user.isStaff, user.avatar,
          user.isLinkedinSignup, user.isLinkedinConnected, user.roles, true, user.inviteToken, user.points, user.consumed);
      }

      function login(credentials) {
        return $resource(API_BASE_URL + '/oauth2/token/', {}, {
          getToken: {
            method: 'POST',
            params: {
              grant_type: 'password',
              client_id: OAUTH_CLIENT_ID,
              username: credentials.username,
              password: credentials.password
            }
          }
        }).getToken().$promise.then(function(value) {
          return postLogin(value);
        });
      }

      function facebookLogin() {
        var deferred = $q.defer();

        FB.login(function (response) {
          if (response.status === 'connected') {
            var accessToken = response.authResponse.accessToken;

            FB.api('/me/permissions', function(response) {
              var declined = [];
              for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].status == 'declined') {
                  declined.push(response.data[i].permission)
                }
              }

              if (_(declined).contains('email')) {
                deferred.reject('missing_permission');
              } else {
                exchangeToken(accessToken, 'facebook')
                  .then(function (response) {
                    deferred.resolve();
                  })
                  .catch(function (response) {
                    deferred.reject(response);
                  });
              }
            });
          } else {
            deferred.reject();
          }
        }, {
          scope: 'public_profile,email',
          auth_type: 'https'
        });

        return deferred.promise;
      }

      function linkedinLogin() {
        var oauth2Url = 'https://www.linkedin.com/uas/oauth2/authorization';
        var state = Configuration.linkedinDefaultState;

        if (localStorageService.cookie.isSupported) {
          state = randomString(32);
          // Save state so it can be verified upon redirect to prevent CSRF
          localStorageService.cookie.set(Configuration.linkedinStateStorageKey, state, 1);

          var redirectState;
          if ($rootScope.postLoginState) {
            redirectState = $rootScope.postLoginState;
          } else if ($rootScope.previous && $rootScope.previous.state) {
            redirectState = $rootScope.previous;
          }

          if (redirectState) {
            localStorageService.cookie.set(Configuration.postLoginStateStorageKey, redirectState, 1);
          }
        }

        var params = {
          response_type: 'code',
          client_id: Configuration.linkedinClientId,
          redirect_uri: $state.href('application.linkedinLogin', {}, {absolute: true}),
          state: state
        };

        var linkedinAuthUrl = oauth2Url + '?' + $httpParamSerializer(params);

        window.location.href = linkedinAuthUrl;
      }

      function getLinkedinToken(code) {
        return $resource(API_BASE_URL + '/accounts/linkedin/token/')
          .save({
            code: code,
            redirectUri: $state.href('application.linkedinLogin', {}, {absolute: true})
          }).$promise;
      }

      function exchangeToken(accessToken, backend) {
        var params = {
          grant_type: 'convert_token',
          client_id: OAUTH_CLIENT_ID,
          backend: backend,
          token: accessToken
        };

        if (localStorageService.cookie.isSupported &&
            localStorageService.cookie.get(Configuration.signupSourceStorageKey)) {
          params['source'] = localStorageService.cookie.get(Configuration.signupSourceStorageKey);
        }

        return $resource(API_BASE_URL + '/oauth2/convert-token/', {}, {
          exchangeToken: {
            method: 'POST',
            params: params
          }
        }).exchangeToken().$promise
          .then(function(value) {
            return postLogin(value);
          });
      }

      function createUserWithDefaultPasswordPromise(user){

      }

      function loginComplete() {
        return $resource(API_BASE_URL + '/accounts/login/complete/', {}, {
          loginComplete: {
            method: 'PUT'
          }
        }).loginComplete().$promise;
      }

      function postLogin(token) {
        OAuthToken.setToken(token);

        return fetchUser()
          .then(function(value) {
            setUser(value);

            $rootScope.$broadcast('perksPointsDaily', 'ready');

            Idle.watch();

            // Send user id to GTM after login
            dataLayer.push({
              userId: value.id
            });
          });
      }

      function loginRedirect(refresh) {
        $rootScope.$emit('backdropOff', 'success');

        if ($rootScope.postLoginState) {
          $state.go($rootScope.postLoginState.state, $rootScope.postLoginState.params, {reload: true});
          $rootScope.postLoginState = null;
        } else if ($rootScope.previous && $rootScope.previous.state) {
          $state.go($rootScope.previous.state, $rootScope.previous.params, {reload: true});
        } else {
          $state.go('application.main', {}, {reload: true})
        }
      }

      function refreshToken() {
        var deferred = $q.defer();

        var refreshToken = OAuthToken.getRefreshToken();

        if (!refreshToken) {
          deferred.reject();

          return deferred.promise;
        }

        return $resource(API_BASE_URL + '/oauth2/token/', {}, {
          refresh: {
            method: 'POST',
            params: {
              grant_type: 'refresh_token',
              client_id: OAUTH_CLIENT_ID,
              refresh_token: refreshToken
            }
          }
        }).refresh().$promise.then(function(value) {
          OAuthToken.setToken(value);
        });
      }

      function logout(shouldMakeApiCall) {
        $rootScope.user = new User();
        $rootScope.user.setIsResolved(true);

        var token = OAuthToken.getAccessToken();
        OAuthToken.removeToken();

        Idle.unwatch();

        // Clear user id from GTM upon logout
        dataLayer.push({
          userId: undefined
        });

        if (!shouldMakeApiCall) {
          var deferred = $q.defer();

          deferred.resolve();

          return deferred.promise;
        } else {
          return $resource(API_BASE_URL + '/oauth2/revoke-token/', {}, {
            revokeToken: {
              method: 'POST',
              params: {
                client_id: OAUTH_CLIENT_ID,
                token: token
              }
            }
          }).revokeToken().$promise
        }
      }

      function fetchUser() {
        return $resource(API_BASE_URL + '/accounts/user/').get().$promise;
      }

      function auth() {
        var deferred = $q.defer();

        if ($rootScope.user && $rootScope.user.isResolved()) {
          deferred.resolve();
        } else {
          fetchUser()
            .then(function(value) {
              setUser(value);

              $rootScope.$broadcast('perksPointsDaily', 'ready');

              Idle.watch();

              // Send user id to GTM if user is already logged in
              dataLayer.push({
                userId: value.id
              });

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
        facebookLogin: facebookLogin,
        linkedinLogin: linkedinLogin,
        getLinkedinToken: getLinkedinToken,
        exchangeToken: exchangeToken,
        auth: auth,
        setUser: setUser,
        loginRedirect: loginRedirect,
        logout: logout,
        refreshToken: refreshToken
      };
    }]);
