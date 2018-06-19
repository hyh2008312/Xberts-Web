'use strict';

angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('application.protected.adminDeals', {
      url: '/admin/discover',
      templateUrl: 'scripts/feature/admin/discover/productDealsListPageAdmin.html',
      controller: 'ProductDealsListPageAdminCtrl as dealsCtrl',
      reloadOnSearch: false
    })
    .state('application.protected.adminArticles', {
      url: "/admin/articles",
      templateUrl: 'scripts/feature/admin/articles/articlesListAdmin.html',
      controller: 'ArticlesListAdminCtrl'
    });
  }]);
