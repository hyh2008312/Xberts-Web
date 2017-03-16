'use strict';

angular.module('xbertsApp')
  .directive('commentAmounts', ['InteractService', function (InteractService) {
    return {
      restrict: 'E',
      scope: {},
      template: '<md-icon>sms</md-icon><span>{{interact.feedbackAmount}}</span>',
      require: '^^interact',
      replace: false,

      link: function (scope, element, attrs, interactCtrl) {
        scope.interact = interactCtrl.getInteract();
      }
    };
  }]);
