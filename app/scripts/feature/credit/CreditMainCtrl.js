angular.module('xbertsApp')
  .controller('CreditMainCtrl', ['$rootScope', '$state', 'creditMain', 'CreditService',
    function($rootScope, $state, creditMain, CreditService) {
    var creditCtrl = this;
    creditCtrl.topBanner = CreditService.topBanner;
    creditCtrl.creditMain = creditMain;
    creditCtrl.badges = CreditService.badges;
    creditCtrl.isOpen = [false,false,false,false];

    creditCtrl.inviteFriends = function() {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      $state.go('application.protected.invite');
    };

    creditCtrl.uploadFile = function() {
      if(!$rootScope.user.authRequired()) {
        return;
      }
      $state.go('application.protected.editProfile', {tab: 'profile'});
    };

    var title = '';
    var description = '';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);

