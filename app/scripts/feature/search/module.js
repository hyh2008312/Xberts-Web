'use strict';

angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.search', {
      url: '/search?q',
      templateUrl: 'scripts/feature/search/searchResult.html',
      controller: 'SearchResultCtrl'
    })
  }]);
