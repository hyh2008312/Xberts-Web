'use strict';

angular.module('xbertsApp')
  .directive('clearFormError', function() {
    return {
      restrict: 'A',
      require: 'form',
      link: function(scope, element, attrs, ctrl) {
        element.on('change', function() {
          scope.$apply(function() {
            ctrl.serverError = {};
          });
        });
      }
    };
  });

