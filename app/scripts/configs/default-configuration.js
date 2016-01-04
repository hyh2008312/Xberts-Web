'use strict';

angular.module('configuration.properties', [])
  .constant('defaultConfiguration', {
    apiBaseUrl: 'http://localhost:8000/api',

    // API endpoints to ignore when server returns unauthorized response status
    unauthorizedExceptionEndpoints: [
      '/accounts/user/',
      '/accounts/auth/',
      '/accounts/logout/'
    ]
  });
