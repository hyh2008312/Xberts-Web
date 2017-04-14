angular.module('xbertsApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('application.creditMain', {
      url: '/perks',
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
              page_size: 6
            },
            fetchFunction: CreditService.getList
          };
          return new Paginator(par).load();
        }]
      }
    })
    .state('application.redeemDetail', {
      url: '/perks/gift/:redeemId',
      templateUrl: 'scripts/feature/credit/RedeemDetail.html',
      controller: 'RedeemDetailCtrl as redeemCtrl',
      resolve: {
        redeemDetail: ['CreditService','$stateParams',function(CreditService, $stateParams) {
          return CreditService.getDetail($stateParams.redeemId);
        }]
      }
    })
    .state('application.personalCredit', {
      url: '/myPoints/:id',
      templateUrl: 'scripts/feature/credit/PersonalCredit.html',
      controller: 'PersonalCreditCtrl',
      resolve: {
        expert: ['ExpertService', '$stateParams', function (ExpertService, $stateParams) {
          return ExpertService.getExpert($stateParams.id);
        }],
        creditMain: ['Paginator','CreditService','ShareProduct',function(Paginator, CreditService, ShareProduct) {
          var par = {
            name: 'credit_gift_list',
            objClass: ShareProduct,
            params: {
              page_size: 6
            },
            fetchFunction: CreditService.getList
          };
          return new Paginator(par).load();
        }],
        points: ['ExpertService','$stateParams',function(ExpertService, $stateParams) {
          return ExpertService.getPoints($stateParams.id);
        }]
      }
    });
  }]);
