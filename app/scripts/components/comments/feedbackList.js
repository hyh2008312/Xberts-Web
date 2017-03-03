angular.module('xbertsApp')
  .directive('feedbackList', ['FeedbackService', 'Feedback', 'Paginator','$timeout', function (FeedbackService, Feedback, Paginator,$timeout) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/components/comments/feedbackList.html',
      scope: {
        interactId: '@'
      },
      require:'^^interact',
      link: function (scope, element, attrs,interactCtrl) {
        var par = {
          name: 'feedback_' + scope.interactId,
          objClass: Feedback,
          params: {
            interact_id: scope.interactId
          },
          fetchFunction: FeedbackService.getList
        };
        scope.newFeedback = {};
        scope.feedbackPaginator = new Paginator(par);

        scope.formToggle = false;

        scope.leaveFeedback = function (feedbackForm) {
          if (feedbackForm.$valid) {
            
            interactCtrl.getCurrentJoin().then(
              function (currentJoin) {
                scope.newFeedback.interact = scope.interactId;
                scope.newFeedback.post = currentJoin.id;
                FeedbackService.create(scope.newFeedback).then(function (feedback) {
                  scope.feedbackPaginator.items.unshift(feedback);
                  scope.formToggle = !scope.formToggle;
                  scope.newFeedback = {};
                }, function (error) {
                  console.log(error);
                });
              }
            );


          }else {
            feedbackForm.$submitted = false;
          }
        }
      }
    };
  }]);
