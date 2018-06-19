'use strict';

angular.module('xbertsApp')
  .directive('trialsMainList', ['InviteService',function(InviteService) {
    return {
      restrict: 'E',
      scope: {
        trials: '='
      },
      templateUrl: 'scripts/feature/main/latestTrialsList/trials-main-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.trials = scope.trials || [];
        scope.shareList = [
          { name: "facebook" },
          { name: "twitter"},
          { name: "linkedin"}
        ];
        scope.inviteObj = angular.copy(InviteService, {});
      }
    }
  }]);
