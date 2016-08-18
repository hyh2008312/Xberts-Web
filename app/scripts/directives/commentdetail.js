'use strict';

angular.module('xbertsApp')
  .directive('commentDetail', function () {
    return {
      templateUrl: 'views/comment/commentdetail.html',
      restrict: 'E',
      replace:true,
      require:'^feedbackDetail',
      scope:{
        item:'='
      },
      link: function postLink(scope, element, attrs,feedbackDetailController) {
        scope.replyActive=false;
        scope.referenceId="comment_"+scope.item.id;
        scope.commentsToggle=function(){
          scope.replyActive=!scope.replyActive;
        };
        scope.commentFormSubmit=function(){
          feedbackDetailController.leaveComment(scope);
        };
      }
    };
  });
