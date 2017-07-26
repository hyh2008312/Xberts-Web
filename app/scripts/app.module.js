'use strict';

angular
  .module('xbertsApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngImgCrop',
    'ngFileUpload',
    'ngIdle',
    'angularMoment',
    'angular-growl',
    'ui.router',
    'infinite-scroll',
    'LocalStorageModule',
    'summernote',
    'ui.bootstrap',
    'internationalPhoneNumber',
    'duScroll',
    'dcbImgFallback',
    'configuration.properties',
    'satellizer',
    'checklist-model',
    'angularRandomString',
    '720kb.socialshare',
    'timer',
    'config',
    'mgcrea.ngStrap',
    'ngMaterial',
    'ngUrlParser',
    'angular-carousel'
  ]);

angular.element(document).ready(function () {
  var token = Cookies.getJSON('oauthtoken');
  if (token) {
    if (token.expire_date - new Date().getTime() < 600 * 1000) {
      //todo: refresh token
      Cookies.remove('oauthtoken');
      console.log('remove oauthtoken');
    }
  }
  angular.bootstrap(document, ['xbertsApp']);
});
