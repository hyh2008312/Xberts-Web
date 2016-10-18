'use strict';

angular.module('xbertsApp')
  .controller('InviteFriendCtrl', ['$rootScope', '$scope',
    function($rootScope, $scope) {
      $scope.inviteLink = $rootScope.user.getInviteLink();

      $scope.facebookShare = function() {
        FB.ui({
          method: 'share',
          href: $scope.inviteLink,
        }, function(response){});
      };
    }]);
