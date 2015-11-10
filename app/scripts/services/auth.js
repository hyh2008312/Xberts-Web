'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.Auth
 * @description
 * # Auth
 * Factory in the yeodjangoApp.
 * todo: auth信息必须进入页面前加载
 */
angular.module('yeodjangoApp')
  .factory('Auth', ['$rootScope',function ($rootScope) {
    // Service logic
    // ...
    var user;
    function User(auth,userId,userName,userType,userAvatar){
      this._auth= (auth === 'true' || auth==='True');
      this._userId=userId;
      this._userName=userName;
      this._userType=(userType === 'true' || userType==='True');
      this._userAvatar=userAvatar;
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
    function setUser(auth,userId,userName,userType,userAvatar){
      user=new User(auth,userId,userName,userType,userAvatar);
      $rootScope.user=user;
    }
    // Public API here
    return {
      setUser:setUser
    };
  }]);
