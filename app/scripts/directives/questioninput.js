'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:QuestionInput
 * @description
 * # QuestionInput
 */
angular.module('xbertsApp')
  .directive('questionInput', function () {
    return {
      templateUrl: "views/questiondirect.html",
      replace: true,
      scope: {
        question: "="
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the QuestionInput directive');
      }
    };
  });
