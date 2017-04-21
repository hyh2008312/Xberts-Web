'use strict';

angular.module('xbertsApp')
  .directive('trialInformation', ['InviteService', function (InviteService) {
    return {
      restrict: 'E',
      scope: {
        trial: '=',
        pageSettings: '='
      },
      templateUrl: 'scripts/feature/review/trialInformation/trial-information.html',
      link: function (scope, element, attrs, ctrls) {
        scope.trial = scope.trial || [];

        // FAB Speed Dial Component
        // Set the component to the normal state
        scope.hidden = false;
        scope.isOpen = false;
        scope.hover = false;
        scope.shareList = [
          { name: "facebook" },
          { name: "twitter"},
          { name: "linkedin"}
        ];

        scope.inviteObj = angular.copy(InviteService, {});
      }
    }
  }]);

