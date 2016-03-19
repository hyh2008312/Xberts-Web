'use strict';

angular.module('configuration.properties', [])
  .constant('defaultConfiguration', {
    apiBaseUrl: 'http://localhost:8000/api',

    oauthClientId: 'CwWuk2YE1v2LZIyKy2mvwyuhliYKHkKSxfhb0835',
    // Threshold for triggering oauth token refresh prior to current token expiration date
    tokenRefreshThreshold: 600, // seconds
    tokenRefreshCheckInterval: 60, // seconds

    // Inactivity time until user is considered idle
    idleTimeout: 1800, // seconds

    postLoginStateStorageKey: 'post_login_state',

    linkedinClientId: '75tq3jze54fv0u',
    linkedinStateStorageKey: 'linkedin_state',
    linkedinDefaultState: 'linkedin_csrf_state',

    // API endpoints to ignore when server returns unauthorized response status
    unauthorizedExceptionEndpoints: [
      '/accounts/user/',
      '/oauth2/token/',
      '/oauth2/revoke_token/'
    ],

    // Maximum number of expertise an user can select
    userExpertiseMax: 5
  });
