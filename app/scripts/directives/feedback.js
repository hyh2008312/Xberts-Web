'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:feedback
 * @description
 * # feedback
 */
angular.module('yeodjangoApp')
  .directive('feedback', function () {
    return {
      templateUrl: '/views/feedback.html',
      restrict: 'E',
      require:'^join',
      link: function postLink(scope, element, attrs) {
        element.text('this is the feedback directive');
      }
    };
  });
