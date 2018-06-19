'use strict';

angular.module('xbertsApp')
  .directive('messageLabel', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        category: '=category'
      },
      templateUrl: 'views/directive/message-label.html'
    }
  });
