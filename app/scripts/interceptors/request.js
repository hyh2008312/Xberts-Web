'use strict';

angular.module('xbertsApp')
  .service('RequestInterceptor', ['$cookies', function($cookies) {
    this.request = function(config) {
      if (config.method !== 'GET' && config.method !== 'OPTIONS' &&
          !'X-CSRFToken' in config.headers) {
        config.headers['X-CSRFToken'] = $cookies.get('csrftoken');
      }

      return config;
    };
  }]);

