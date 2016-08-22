'use strict';

angular.module('xbertsApp')
  .directive('feedback', function () {
    return {
      templateUrl: 'views/comment/feedback.html',
      restrict: 'E',
      require: '^join',
      link: function postLink(scope, element, attrs, joinController) {
        var feedbackCallback = function () {
          scope.feedback = {};
        };
        scope.btnText = attrs.btnText || 'Comment';
        scope.feedback = {};
        scope.feedbackFormSubmit = function () {
          if (scope.feedbackForm.$valid) {
            joinController.leaveFeedback(scope.feedback, feedbackCallback);
          }
        }
      }
    };
  });
