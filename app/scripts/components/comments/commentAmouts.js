'use strict';

angular.module('xbertsApp')
  .directive('commentAmounts', ['InteractService', function (InteractService) {
    return {
      restrict: 'E',
      scope: {},
      template: '<span>{{interact.feedbackAmount || interact.feedback_amount || " "}}</span>',
      require: '^^interact',
      replace: false,

      link: function (scope, element, attrs, interactCtrl) {
        scope.interact = interactCtrl.getInteract();
      }
    };
  }]);
