angular.module('xbertsApp')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('application.shareProductList', {
        url: '/shareProduct',
        templateUrl: 'scripts/feature/discover/shareProductList.html',
        controller: 'ShareProductListCtrl as productCtrl',
        resolve: {
          products: ['ShareProductService', function (ShareProductService) {
            return ShareProductService.getList();
          }]
        }
      });
  }]);
