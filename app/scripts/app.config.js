'use strict';

angular
  .module('xbertsApp')
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
  }])
  .config(['$httpProvider', '$resourceProvider', function ($httpProvider, $resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $httpProvider.interceptors.push('RequestInterceptor');
    $httpProvider.interceptors.push('AuthInterceptor');
  }])
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('xberts')
      .setStorageType('sessionStorage');
  }])
  .config(['ipnConfig', function (ipnConfig) {
    ipnConfig.autoHideDialCode = false;
    ipnConfig.nationalMode = false;
    ipnConfig.autoPlaceholder = false;
  }])
  .config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(10000);
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalDisableCountDown(true);
  }])
  .config(['$authProvider', 'ConfigurationProvider', function ($authProvider, ConfigurationProvider) {
    $authProvider.linkedin({
      clientId: ConfigurationProvider.linkedinClientId,
      url: ConfigurationProvider.apiBaseUrl + '/accounts/linkedin/token/'
    });
  }])
  .config(['tagsInputConfigProvider', function (tagsInputConfigProvider) {
    tagsInputConfigProvider.setDefaults('tagsInput', {
      minLength: 1
    });
  }])
  .config(['IdleProvider', 'KeepaliveProvider', 'ConfigurationProvider',
    function (IdleProvider, KeepaliveProvider, ConfigurationProvider) {
      IdleProvider.idle(ConfigurationProvider.idleTimeout); // seconds
      // Disable timeout feature since automatic logout is not desired for now
      IdleProvider.timeout(0);
      KeepaliveProvider.interval(ConfigurationProvider.tokenRefreshCheckInterval);
    }]);
