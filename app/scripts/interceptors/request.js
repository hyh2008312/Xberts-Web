'use strict';

angular.module('xbertsApp')
  .service('RequestInterceptor', ['$cookies', 'S', 'OAuthToken', 'Configuration',
    function($cookies, S, OAuthToken, Configuration) {
      this.request = function(config) {
        angular.forEach(Configuration.requestExceptionEndpoints, function(value) {
          if (S(config.url).endsWith(value)) {
            return config;
          }
        });

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

