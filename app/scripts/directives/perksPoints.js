'use strict';

angular.module('xbertsApp')
  .directive('perksPoints', ['$rootScope', function ($rootScope) {
    return {
      template: '<span class="md-headline xb-perks-points">+ {{points > 1 ? points + " Points": points + " Point"}}</span>',
      restrict: 'E',
      replace: true,
      link: function(scope, element, attrs, ctrls) {

        //scope.$emit('perksPointsOn', 100);
        scope.points = 0;
        $rootScope.$on('perksPointsOn', function (e, d) {
          scope.points = d;
          element.addClass('animation-perks-points');
        });
        element.on('animationend', function() {
          element.removeClass('animation-perks-points');
        })
      }
    };
  }]);
