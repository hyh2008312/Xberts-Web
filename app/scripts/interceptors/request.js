'use strict';

angular.module('xbertsApp')
  .service('RequestInterceptor', ['$cookies', 'OAuthToken', function($cookies, OAuthToken) {
    this.request = function(config) {
      if (config.method !== 'GET' && config.method !== 'OPTIONS' &&
          !('X-CSRFToken' in config.headers)) {
        config.headers['X-CSRFToken'] = $cookies.get('csrftoken');
      }

      var oauthAccessToken = OAuthToken.getAccessToken();
      if (oauthAccessToken) {
        config.headers['Authorization'] = 'Bearer ' + oauthAccessToken;
      }

      return config;
    };
  }]);

