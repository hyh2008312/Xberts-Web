'use strict';

angular.module('xbertsApp')
  .service('OAuthToken', ['$cookies', function($cookies) {
    var cookieName = 'oauthtoken';

    this.setToken = function(data) {
      $cookies.putObject(cookieName, data);
    };

    this.getToken = function() {
      return $cookies.getObject(cookieName);
    };

    this.getAccessToken = function() {
      var token = this.getToken();
      return token ? token.access_token : undefined;
    };

    this.removeToken = function() {
      $cookies.remove(cookieName);
    };
  }]);
