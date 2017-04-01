angular.module('xbertsApp')
  .controller('CreditMainCtrl', ['$rootScope', 'creditMain', 'CreditService', function($rootScope, creditMain, CreditService) {
    var creditCtrl = this;
    creditCtrl.topBanner = CreditService.topBanner;
    creditCtrl.creditMain = creditMain.items;
    creditCtrl.badges = CreditService.badges;
    creditCtrl.isOpen = [false,false,false,false];

    var title = '';
    var description = '';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);

