'use strict';

/**
 * @ngdoc directive
 * @name yeodjangoApp.directive:commentDetail
 * @description
 * # commentDetail
 */
angular.module('yeodjangoApp')
  .directive('commentDetail', function () {
    return {
      templateUrl: '/views/commentdetail.html',
      restrict: 'E',
      replace:true,
      require:'^feedbackDetail',
      scope:{
        item:'='
      },
      link: function postLink(scope, element, attrs,feedbackDetailController) {
        scope.replyActive=false;
        scope.commentsToggle=function(){
          scope.replyActive=!scope.replyActive;
        };
        scope.commentFormSubmit=function(){
          feedbackDetailController.leaveComment(scope);
        };
      }
    };
  });
