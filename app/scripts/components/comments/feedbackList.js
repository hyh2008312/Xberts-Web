angular.module('xbertsApp')
  .directive('feedbackList', ['FeedbackService', 'Feedback', 'Paginator', 'growl',
    function (FeedbackService, Feedback, Paginator, growl) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/components/comments/feedbackList.html',
      require: '^^interact',
      scope: {
        hideState: '=',
        hidePoints: '='
      },
      link: function (scope, element, attrs, interactCtrl) {
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
          if(interactCtrl.getCurrentJoin().feedback_amount >= 3) {
            scope.formToggle = !scope.formToggle;
            scope.newFeedback = {};
            growl.error('comments');
            return false;
          }
          if (feedbackForm.$valid) {

            interactCtrl.getOrCreateCurrentJoin().then(
              function (currentJoin) {
                var feedback = Feedback.build({
                  date_published: new Date(),
                  details: scope.newFeedback.details,
                  interact: scope.interactId,
                  post: currentJoin
                });

                var feedbackData = {
                  details: scope.newFeedback.details,
                  interact: scope.interactId,
                  post: currentJoin.id
                };

                scope.formToggle = !scope.formToggle;
                scope.newFeedback = {};

                scope.feedbackPaginator.items.unshift(feedback);
                if(!scope.hidePoints) {
                  scope.$emit('perksPointsOn', 2);
                }
                feedback.post.feedback_amount++;
                interactCtrl.setCurrentJoin(feedback.post);
                interactCtrl.getInteract().increaseMessageAmount();
                FeedbackService.create(feedbackData);

              }
            );


          } else {
            feedbackForm.$submitted = false;
          }
        }
      }
    };
  }]);
