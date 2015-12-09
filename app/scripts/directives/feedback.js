'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:feedback
 * @description
 * # feedback
 */
angular.module('xbertsApp')
  .directive('feedback', function () {
    return {
      templateUrl: '/views/feedback.html',
      restrict: 'E',
      require: '^join',
      link: function postLink(scope, element, attrs, joinController) {
        //element.text('this is the feedback directive');
        var feedbackCallback=function(){
          scope.feedback={};
        };
        scope.btnText=attrs.btnText || 'Comment';
        scope.feedbackFormSubmit = function () {
          if (scope.feedbackForm.$valid) {
            joinController.leaveFeedback(scope.feedback,feedbackCallback);
          }else {
            console.log("invalid form data")
          }
        }
      }
    };
  });
