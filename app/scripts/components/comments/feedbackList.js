angular.module('xbertsApp')
  .directive('feedbackList', ['FeedbackService', 'Feedback', 'Paginator', function (FeedbackService, Feedback, Paginator) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/components/comments/feedbackList.html',
      require:'^^interact',
      scope:{
        onHideState: '='
      },
      link: function (scope, element, attrs,interactCtrl) {
        scope.interactId = interactCtrl.getInteract().id;

        var par = {
          name: 'feedback_' + scope.interactId,
          objClass: Feedback,
          params: {
            interact_id: scope.interactId
          },
          fetchFunction: FeedbackService.getList
        };
        scope.feedbackPaginator = new Paginator(par);

        scope.newFeedback = {};

        scope.formToggle = false;

        scope.leaveFeedback = function (feedbackForm) {
          if (feedbackForm.$valid) {

            interactCtrl.getOrCreateCurrentJoin().then(
              function (currentJoin) {
                scope.newFeedback.interact = scope.interactId;
                scope.newFeedback.post = currentJoin.id;
                FeedbackService.create(scope.newFeedback).then(function (feedback) {
                  scope.feedbackPaginator.items.unshift(feedback);
                  scope.formToggle = !scope.formToggle;
                  scope.newFeedback = {};
                  interactCtrl.getInteract().increaseMessageAmount();
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
