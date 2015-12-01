"use strict";

angular.module("xbertsApp")
  .factory('AuthService', ['$rootScope', '$resource', '$location', function($rootScope, $resource, $location) {
    function User(auth, userId, userName, userType, userAvatar) {
      this._auth = auth;
      this._userId = userId;
      this._userName = userName;
      this._userType = userType;
      this._userAvatar = userAvatar;
      this.isAuth=function (){
        return this._auth;
      };
      this.isStaff=function(){
        return this._userType;
      };
      this.getUserId=function (){
        return this._userId;
      };
      this.getUserName=function (){
        return this._userName;
      };
      this.getUserType=function (){
        return this._userType;
      };
      this.getUserAvatar=function (){
        return this._userAvatar;
      };
    }

    function setUser(user){
      $rootScope.user = new User(true, user.id, user.fullname, user.isStaff, user.avatar);
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

    return {
      login: login,
      user: $resource('/accounts/user/', {}),
      setUser: setUser
    };
  }]);
