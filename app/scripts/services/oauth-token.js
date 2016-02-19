'use strict';

angular.module('xbertsApp')
  .service('OAuthToken', ['$cookies', function($cookies) {
    var cookieName = 'oauthtoken';

    this.setToken = function(data) {
      data.expire_date = new Date().getTime() + data.expires_in * 1000;

      $cookies.putObject(cookieName, data);
    };

    this.getToken = function() {
      return $cookies.getObject(cookieName);
    };

    this.getAccessToken = function() {
      var token = this.getToken();
      return token ? token.access_token : undefined;
    };

    this.getRefreshToken = function() {
      var token = this.getToken();
      return token ? token.refresh_token : undefined;
    };

    this.getTokenExpireDate = function() {
      var token = this.getToken();
      return token ? token.expire_date : undefined;
    };

    this.removeToken = function() {
      $cookies.remove(cookieName);
    };
  }]);
