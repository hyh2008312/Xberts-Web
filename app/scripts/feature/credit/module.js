angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.creditMain', {
      url: '/credit',
      templateUrl: 'scripts/feature/credit/CreditMain.html',
      controller: 'CreditMainCtrl as creditCtrl',
      resolve: {
        topBanner: ['CreditService',function(CreditService) {
          return CreditService.topBanner;
        }],
        creditMain: ['Paginator','CreditService','ShareProduct',function(Paginator, CreditService, ShareProduct) {
          var par = {
            name: 'credit_gift_list',
            objClass: ShareProduct,
            params: {
              page_size: 4
            },
            fetchFunction: CreditService.getList
          };
          return new Paginator(par).load();
        }]
      }
    })
    .state('application.redeemDetail', {
      url: '/credit/:redeemId',
      templateUrl: 'scripts/feature/credit/RedeemDetail.html',
      controller: 'RedeemDetailCtrl as redeemCtrl',
      resolve: {
        redeemDetail: ['CreditService','$stateParams',function(CreditService, $stateParams) {
          return CreditService.getDetail($stateParams.redeemId);
        }]
      }
    })
  }]);
