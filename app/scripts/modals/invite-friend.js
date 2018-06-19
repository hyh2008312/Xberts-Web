'use strict';

angular.module('xbertsApp')
  .controller('InviteFriendCtrl', ['$rootScope', '$scope', 'AnalyticsService',
    function($rootScope, $scope, AnalyticsService) {
      $scope.inviteLink = $rootScope.user.getInviteLink();

      $scope.facebookShare = function() {
        AnalyticsService.sendPageView('/invitefriends/facebook');

        FB.ui({
          method: 'share',
          href: $scope.inviteLink,
        }, function(response){});
      };
    }]);
