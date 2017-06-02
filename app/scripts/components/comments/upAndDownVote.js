'use strict';

angular.module('xbertsApp')
  .directive('upAndDownVote', [function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'scripts/components/comments/upAndDownVote.html',
      require: '^^interact',
      replace: false,

      link: function (scope, element, attrs, interactCtrl) {
        scope.join = interactCtrl.getCurrentJoin();
        scope.upvote = interactCtrl.upvote;
        scope.downvote = interactCtrl.downvote;
        scope.interact = interactCtrl.getInteract();
      }
    };
  }]);
