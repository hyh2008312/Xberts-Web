angular.module('xbertsApp')
  .directive('feedbackList', ['FeedbackService', 'Feedback', 'Paginator', function (FeedbackService, Feedback, Paginator) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/components/comments/feedbackList.html',
      require: '^^interact',
      scope: {
        hideState: '='
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
                scope.$emit('perksPointsOn', 2);
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
