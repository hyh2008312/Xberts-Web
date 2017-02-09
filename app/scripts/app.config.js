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
  .config(['$urlRouterProvider', function ($urlRouterProvider) {
    // Sourced from https://github.com/angular-ui/ui-router/issues/50
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path[path.length - 1] === '/';

      // Remove trailing slash, so it will match correct route
      if (hasTrailingSlash) {
        var newPath = path.substr(0, path.length - 1);
        return newPath;
      }
    });
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
    growlProvider.globalTimeToLive(3000);
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalDisableCountDown(true);
  }])
  .config(['$authProvider', 'ConfigurationProvider', 'API_BASE_URL', function ($authProvider, ConfigurationProvider, API_BASE_URL) {
    $authProvider.linkedin({
      clientId: ConfigurationProvider.linkedinClientId,
      url: API_BASE_URL + '/accounts/linkedin/token/'
    });
  }])
  .config(['IdleProvider', 'KeepaliveProvider', 'ConfigurationProvider',
    function (IdleProvider, KeepaliveProvider, ConfigurationProvider) {
      IdleProvider.idle(ConfigurationProvider.idleTimeout); // seconds
      // Disable timeout feature since automatic logout is not desired for now
      IdleProvider.timeout(0);
      KeepaliveProvider.interval(ConfigurationProvider.tokenRefreshCheckInterval);
    }]);
