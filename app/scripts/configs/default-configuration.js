'use strict';

angular.module('configuration.properties', [])
  .constant('defaultConfiguration', {
    // Threshold for triggering oauth token refresh prior to current token expiration date
    tokenRefreshThreshold: 600, // seconds
    tokenRefreshCheckInterval: 60, // seconds

    // Inactivity time until user is considered idle
    idleTimeout: 1800, // seconds

    signupSourceStorageKey: 'signup_source',
    postLoginStateStorageKey: 'post_login_state',

    linkedinClientId: '75tq3jze54fv0u',
    linkedinStateStorageKey: 'linkedin_state',
    linkedinDefaultState: 'linkedin_csrf_state',

    // API endpoints to ignore when trying to insert request header
    requestExceptionEndpoints: [
      'cloudfront.net',
      'ip/',
      'products/categories/'
    ],

    // API endpoints to ignore when server returns unauthorized response status
    unauthorizedExceptionEndpoints: [
      'cloudfront.net',
      '/accounts/user/',
      '/oauth2/token/',
      '/oauth2/revoke_token/'
    ],

    // Maximum number of expertise an user can select
    userExpertiseMax: 5,

    shopifyDomain: 'xberts',
    shopifyAppId: '6',
    shopifyKey: 'e645ba2826a8244882d1f62efd0ae361',

    notificationCategories: ['PRODUCT_INQUIRY', 'FEEDBACK', 'COMMENT', 'LIKE', 'CONFIRM_ADDRESS',
      'CONFIRM_ADDRESS_REMINDER', 'REVIEW_APPLICATION', 'REVIEW_SELECTION_ANNOUNCEMENT',
      'REVIEW_SELECTION_REVOKE', 'REPORT_CHECK_IN', 'REPORT_REMINDER', 'REPORT_PAST_DUE',
      'SHIPPING_NOTIFICATION','ANSWER']
  });
