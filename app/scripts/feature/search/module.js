'use strict';

angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.search', {
      url: '/search/:question',
      templateUrl: 'scripts/feature/search/searchResult.html',
      controller: 'SearchResultCtrl',
      resolve: {
        result: [function(SearchService, $stateParams) {
          return {};
        }]
      }
    })
  }]);
