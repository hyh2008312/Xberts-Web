'use strict';

angular.module('configuration.properties', [])
  .constant('defaultConfiguration', {
    apiBaseUrl: 'http://localhost:8000/api',

    oauthClientId: 'CwWuk2YE1v2LZIyKy2mvwyuhliYKHkKSxfhb0835',

    linkedinClientId: '75tq3jze54fv0u',

    // API endpoints to ignore when server returns unauthorized response status
    unauthorizedExceptionEndpoints: [
      '/accounts/user/',
      '/oauth2/token/',
      '/oauth2/revoke_token/'
    ],

    // Maximum number of expertise an user can select
    userExpertiseMax: 5
  });
