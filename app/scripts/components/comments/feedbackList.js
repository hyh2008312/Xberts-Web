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
          if (feedbackForm.$valid) {

            var feedbackData = {
              details: scope.newFeedback.details,
              interact: scope.interactId
            };

            FeedbackService.create(feedbackData).then(function(feedback) {
              interactCtrl.getInteract().increaseMessageAmount();
              console.log(feedback);
              scope.formToggle = !scope.formToggle;
              scope.newFeedback = {};
              scope.feedbackPaginator.items.unshift(feedback);
            });

          } else {
            feedbackForm.$submitted = false;
          }
        }
      }
    };
  }]);
