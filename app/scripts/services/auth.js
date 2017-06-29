'use strict';

angular.module('xbertsApp')
  .factory('AuthService', ['$rootScope', '$resource', '$state', '$q', '$httpParamSerializer', '$location',
    '_', 'Configuration', 'OAuthToken', 'SystemConstant', 'randomString', 'localStorageService', 'Idle', 'API_BASE_URL',
    'OAUTH_CLIENT_ID','$mdDialog','AnalyticsService','$window','SignupService','VerificationEmailService','growl','$timeout',
    '$mdMedia','LoginDialogFactory','AccountService','$filter',
    function($rootScope, $resource, $state, $q, $httpParamSerializer, $location,
             _, Configuration, OAuthToken, SystemConstant, randomString, localStorageService, Idle, API_BASE_URL,
             OAUTH_CLIENT_ID, $mdDialog, AnalyticsService,$window,SignupService,VerificationEmailService,growl,$timeout,
             $mdMedia,LoginDialogFactory,AccountService,$filter) {
      function User(userId, firstName, lastName, userEmail, userType, userAvatar, isLinkedinSignup, isLinkedinConnected,
                    roles, isResolved, inviteToken, points, consumed, isEmailVerified,isInvited) {
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
        this._isEmailVerified = isEmailVerified;
        this._isInvited = isInvited;

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
            if(!$mdMedia('xs')) {
              if(!obj) {
                $timeout.cancel(LoginDialogFactory.timer);
                $mdDialog.cancel();
              }
              $mdDialog.show({
                controller: function(scope, $mdDialog) {
                  $rootScope.postLoginState = $rootScope.next;

                  scope.showTitle = obj;

                  scope.signUpDialog = !obj?false:true;

                  scope.changeDialog = function() {
                    scope.signUpDialog = !scope.signUpDialog;
                  };

                  scope.cancel = function() {
                    $mdDialog.cancel();
                  };
                  scope.login = function() {
                    if (!scope.loginForm.$valid) {
                      return;
                    }
                    scope.$emit('backdropOn', 'post');

                    AnalyticsService.sendPageView($state.href("application.login",{},{absolute:true}) + '/confirm');

                    scope.loginForm.serverError = {};

                    login({username: scope.username, password: scope.password})
                      .then(function() {
                        $mdDialog.cancel();
                        loginRedirect();
                        scope.$emit('backdropOff', 'success');
                      })
                      .catch(
                        function(httpResponse) {
                          scope.$emit('backdropOff', 'error');
                          if (httpResponse.status === 401 || httpResponse.status === 403) {
                            scope.loginForm.serverError = {invalidCredentials: true};
                          } else if (httpResponse.status === 400 && httpResponse.data.error === 'linkedin_signup') {
                            scope.loginForm.serverError = {linkedinSignup: true};
                          } else {
                            scope.loginForm.serverError = {generic: true};
                          }
                        });
                  };

                  scope.signup = function() {
                    if (!scope.signupForm.$valid) {
                      return;
                    }

                    scope.$emit('backdropOn', 'post');


                    AnalyticsService.sendPageView($state.href("application.signup",{},{absolute:true}) + '/confirm');

                    scope.signupForm.serverError = {};

                    SignupService.signup(scope.firstName, scope.lastName, scope.email, scope.password)
                      .then(function(value) {
                        return login({
                          username: value.email,
                          password: scope.password
                        });
                      })
                      .then(function() {
                        $mdDialog.cancel();
                        loginRedirect();
                        scope.$emit('backdropOff', 'success');
                      })
                      .catch(function(httpResponse) {
                        scope.$emit('backdropOff', 'error');
                        if (httpResponse.status === 409) {
                          scope.signupForm.serverError.userExist = true;
                        } else {
                          scope.signupForm.serverError.generic = true;
                        }
                      });
                  };

                  scope.facebookLogin = function(loginError) {
                    scope.$emit('backdropOn', 'post');

                    AnalyticsService.sendPageView('/facebooklogin');

                    facebookLogin()
                      .then(function () {
                        scope.$emit('backdropOff', 'success');
                        if($rootScope.user.getUserEmail()) {
                          $mdDialog.cancel();
                          loginRedirect();
                        }
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
                disableParenScroll: true,
                onRemoving: function() {
                  if(!LoginDialogFactory.signUpDialog) {
                    $timeout.cancel(LoginDialogFactory.timer);
                    LoginDialogFactory.dialogfirstTime = true;
                    if($rootScope.state.current.name == 'application.productDeals') {
                      if(!$rootScope.user.isAuth()) {
                        LoginDialogFactory.timer = $timeout(function() {
                          if(!$mdMedia('xs') && !$rootScope.user.authRequired(true)) {
                            LoginDialogFactory.signUpDialog = true;
                            return;
                          }
                        }, 30000);
                      } else {
                        $timeout.cancel(LoginDialogFactory.timer);
                        $mdDialog.cancel();
                      }
                    } else {
                      $timeout.cancel(LoginDialogFactory.timer);
                      $mdDialog.cancel();
                    }
                  }
                }
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

        this.getEmailVerification = function() {
          return this._isEmailVerified;
        };

        this.setEmailVerification = function(isEmailVerified) {
          this._isEmailVerified = isEmailVerified;
        };

        this.getInvited = function() {
          return this._isInvited;
        };

        this.setInvited = function(isInvited) {
          this._isInvited = isInvited;
        };
      }

      function setUser(user) {
        $rootScope.user = new User(user.id, user.firstName, user.lastName, user.email, user.isStaff, user.avatar,
          user.isLinkedinSignup, user.isLinkedinConnected, user.roles, true, user.inviteToken, user.points,
          user.consumed, user.isEmailVerified, user.isInvited);
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
                  .then(function () {
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
            if(!$filter('isEmail')(value.email)) {
              $mdDialog.show({
                controller: function(scope, $mdDialog) {
                  scope.data = {};

                  scope.data.email = value.email;

                  scope.cancel = function() {
                    $mdDialog.cancel();

                    fetchSetUser(value);

                    loginRedirect();
                  };

                  scope.changeEmail = function() {
                    if (!scope.changeEmailForm.$valid) {
                      return;
                    }

                    scope.$emit('backdropOn', 'put');

                    scope.changeEmailForm.serverError = {};

                    AccountService.changeEmail(scope.data.email)
                      .then(function (value) {
                        $rootScope.user.setUserEmail(value.email);
                        scope.$emit('backdropOff', 'success');
                        $state.go('application.expert', {expertId: value.userId});
                        loginRedirect();
                      })
                      .catch(function (response) {
                        scope.$emit('backdropOff', 'error');

                        if (response.status === 409) {
                          scope.changeEmailForm.serverError.duplicate = true;
                        } else {
                          scope.changeEmailForm.serverError.generic = true;
                        }
                      });
                  };
                },
                templateUrl: 'scripts/feature/login/emailAddress/emailAddress.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                disableParenScroll: true,
                multiple:true,
                openFrom:{
                  left:200,
                  top: 200,
                  width:561,
                  height:312.5
                },
                onShowing: function() {
                  angular.element('md-dialog.md-transition-in:eq(0)').animate({opacity:0},0);
                }
              });
              return;
            }
            fetchSetUser(value)

          });
      }

      function fetchSetUser(value) {
        setUser(value);

        $rootScope.$broadcast('perksPointsDaily', 'ready');

        Idle.watch();

        // Send user id to GTM after login
        dataLayer.push({
          userId: value.id
        });
      }

      function loginRedirect() {
        $rootScope.$emit('backdropOff', 'success');
        if ($rootScope.postLoginState) {
          $state.go($rootScope.postLoginState.state, $rootScope.postLoginState.params, {reload: true});
          $rootScope.postLoginState = null;
        } else if ($rootScope.previous && $rootScope.previous.state) {
          localStorageService.clearAll();
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

              if(value.email)

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

      function veridateEmail($stateParams) {
        $rootScope.user.setEmailVerification(true);
        VerificationEmailService.validateEmail($stateParams)
        .then(function() {})
        .catch(function(httpResponse) {
          if (httpResponse.status === 400 || httpResponse.status === 404) {
            growl.error('Oops! The email verification link has expired. You can log in to resend a new confirmation!');
          }
        });
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
        refreshToken: refreshToken,
        veridateEmail: veridateEmail
      };
    }]);
