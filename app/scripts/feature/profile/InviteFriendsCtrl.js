'use strict';

angular.module('xbertsApp')
  .controller('InviteFriendsCtrl', ['$window','$scope','$rootScope', 'InviteService', function ($window,$scope,$rootScope,InviteService) {
    var title = '';
    var description = '';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

    $scope.inviteObj = angular.copy(InviteService, {});

    $scope.twitterMessage = function() {
      $window.open('https://twitter.com/messages/compose?&text=' +
        encodeURIComponent(InviteService.messageBody),InviteService.messageTitle,
        'toolbar=no,scrollbars=yes,resizable=yes,width='+($window.innerWidth<600 ? $window.innerWidth:600)+',height='+($window.innerHeight<500 ? $window.innerWidth:500)+',left=500,top=500');
    };
  }]);
