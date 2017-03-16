'use strict';

angular.module('xbertsApp')
  .directive('vote', ['InteractService', function (InteractService) {
    return {
      restrict: 'E',
      scope: {},
      template: '<md-icon ng-class="{\'md-warn\':join.vote}"' +
      'ng-click="vote()">' +
      'thumb_up' +
      '</md-icon> <span>{{interact.vote_amount || interact.voteAmount || " "}}</span>',
      require: '^^interact',
      replace: false,

      link: function (scope, element, attrs, interactCtrl) {
        scope.join = interactCtrl.getCurrentJoin();
        scope.vote = interactCtrl.vote;
        scope.interact = interactCtrl.getInteract();
      }
    };
  }]);
