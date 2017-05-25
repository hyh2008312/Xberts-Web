'use strict';

angular.module('xbertsApp')
  .run(['$rootScope', 'AuthService', 'OAuthToken', 'Configuration',
    function($rootScope, AuthService, OAuthToken, Configuration) {
      $rootScope.$on('Keepalive', function() {
        console.log('keepalive');
        var oauthTokenExpireDate = OAuthToken.getTokenExpireDate();
        if ($rootScope.user.isAuth() &&
            oauthTokenExpireDate &&
            oauthTokenExpireDate - new Date().getTime() < Configuration.tokenRefreshThreshold * 1000) {
          // Token is about to expire, try to refresh it
          AuthService.refreshToken();
        }
      });
  }]);
