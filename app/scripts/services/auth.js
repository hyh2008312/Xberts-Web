"use strict";

angular.module("xbertsApp")
  .factory('AuthService', ['$rootScope', '$resource','$state', function ($rootScope, $resource, $state) {
    function User(userId, userName, userType, userAvatar) {
      this._userId = userId || '';
      this._userName = userName || '';
      this._userType = userType || false;
      this._userAvatar = userAvatar || '';

      this.isAuth = function () {
        return this._userId ? true : false;
      };
      this.isStaff = function () {
        return this._userType;
      };
      this.getUserId = function () {
        return this._userId;
      };
      this.getUserName = function () {
        return this._userName;
      };
      this.getUserType = function () {
        return this._userType;
      };
      this.getUserAvatar = function () {
        return this._userAvatar;
      };

      this.setUserName = function(userName) {
        this._userName = userName;
      }

      this.setUserAvatar = function(userAvatar) {
        this._userAvatar = userAvatar;
      }

      this.authRequired = function () {
        if (this.isAuth()) {
          return true;
        } else {
          $state.go('application.login');
          return false;
        }
      }
    }

    function setUser(user) {
      $rootScope.user = new User(user.id, user.fullName, user.isStaff, user.avatar);
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

    $rootScope.user = new User();


    return {
      login: login,
      user: $resource('/accounts/user/', {}),
      setUser: setUser
    };
  }]);
