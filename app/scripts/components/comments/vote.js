'use strict';

angular.module('xbertsApp')
  .directive('vote', ['InteractService', function (InteractService) {
    return {
      restrict: 'E',
      scope: {},
      template: '<md-icon ng-class="{\'md-warn\':join.vote}"' +
      'ng-click="vote()">' +
      'thumb_up' +
      '</md-icon>',
      require: '^^interact',
      replace: true,

      link: function (scope, element, attrs, interactCtrl) {
        scope.join = interactCtrl.getCurrentJoin();

        console.log(scope.join);
        scope.vote = function () {
          interactCtrl.getOrCreateCurrentJoin().then(function (currentJoin) {
            console.log(currentJoin);
            var join = {id: currentJoin.id, vote: !currentJoin.vote};
            InteractService.vote(join).then(
              function (newJoin) {
                interactCtrl.setCurrentJoin(newJoin);
                console.log(scope.join);
              }
            );
          });
        };
      }
    };
  }]);
