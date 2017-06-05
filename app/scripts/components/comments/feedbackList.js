angular.module('xbertsApp')
  .directive('feedbackList', ['FeedbackService', 'Feedback', 'Paginator', 'growl', '$rootScope',
    function (FeedbackService, Feedback, Paginator, growl, $rootScope) {
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

        scope.autofocus = function() {
          if(!$rootScope.user.authRequired()) {
            return false;
          }
        };

        scope.leaveFeedback = function (feedbackForm) {
          if(interactCtrl.getCurrentJoin().feedback_amount >= 3) {
            scope.formToggle = !scope.formToggle;
            scope.newFeedback = {};
            growl.error("Sorry! You're not allowed to post more than 3 comments under the same post.");
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
                feedback.post.feedback_amount++;
                if(!scope.hidePoints && feedback.post.feedback_amount<=1) {
                  //scope.$emit('perksPointsOn', 2);
                }
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
