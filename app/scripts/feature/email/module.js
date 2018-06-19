'use strict';

angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.emailUnsubscribe', {
      url: '/unsubscribe?h_id&email',
      templateUrl: 'scripts/feature/email/emailUnsubscribe.html',
      controller: 'EmailUnsubscribeCtrl'
    })
  }]);
