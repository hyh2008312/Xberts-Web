'use strict';

angular.module('xbertsApp')
  .directive('vote', ['InteractService', function (InteractService) {
    return {
      restrict: 'E',
      scope: {
        xbStyle: '=',
        xbBlog: '='
      },
      templateUrl: 'scripts/components/comments/vote.html',
      require: '^^interact',
      replace: false,

      link: function (scope, element, attrs, interactCtrl) {
        scope.join = interactCtrl.getCurrentJoin();
        scope.vote = interactCtrl.vote;
        scope.interact = interactCtrl.getInteract();
      }
    };
  }]);
