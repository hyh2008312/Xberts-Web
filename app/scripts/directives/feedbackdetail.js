'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:feedbackDetail
 * @description
 * # feedbackDetail
 */
angular.module('xbertsApp')
  .directive('feedbackDetail',['Paginator','$rootScope','Interact', 'growl',function (Paginator,$rootScope,Interact,growl) {
    return {
      templateUrl: '/views/feedbackdetail.html',
      replace:true,
      scope:{
        item:'='
      },
      restrict: 'E',
      require:'^join',
      controller:function($scope){
        this.leaveComment=function(commentScope){
          $scope.commentSubmit(commentScope);
        };
      },
      link: function postLink(scope, element, attrs,joinController) {
        scope.commentsActive=false;
        scope.referenceId='feedback_'+scope.item.id;
        scope.commentsToggle=function(){
          scope.commentsActive=!scope.commentsActive;
          if(scope.commentsPaginator===undefined){
            getCommentsPaginator();
          }else {
          }
        };

        scope.commentFormSubmit=function(){
          scope.commentSubmit(scope);
        };
        scope.commentSubmit=function(commentScope){
          if(!$rootScope.user.authRequired()){
            return
          }
          var callback=function(){
            commentScope.comment.details='';
          };
          if (commentScope.commentForm.$valid) {
            commentScope.comment.post_to_id=commentScope.item.post.id;
            commentScope.comment.feedback=scope.item.id;
            var join=joinController.getJoin();
            if(join.id===undefined){
              joinController.participatePromise().then(function(){
                joinController.leaveComment(commentScope.comment,callback).then(function(comment){
                  scope.commentsPaginator.items.unshift(comment);
                  scope.item.comment_amount+=1;
                  growl.success('success',{referenceId:commentScope.referenceId});
                },function(error){
                  growl.error(error,{referenceId:commentScope.referenceId});
                });
              },function(error){
                growl.error(error,{referenceId:commentScope.referenceId});
              });
            }else {
              joinController.leaveComment(commentScope.comment,callback).then(function(comment){
                scope.commentsPaginator.items.unshift(comment);
                scope.item.comment_amount+=1;
                growl.success('success',{referenceId:commentScope.referenceId});
              },function(error){
                growl.error(error,{referenceId:commentScope.referenceId});
              });
            }
          }
        };
        var getCommentsPaginator=function(){
          var fetchFunction = function (nextPage, otherParams, callback) {
            var commentsResult = Interact.Comment({feedback_id: scope.item.id});
            var params = {page: nextPage};
            angular.extend(params, otherParams);
            commentsResult.get(params, callback,function(){
              scope.commentsPaginator.loading=false;
            });
          };
          scope.commentsPaginator= Paginator('comments_'+scope.item.id, fetchFunction);
          scope.commentsPaginator.clear();
          scope.commentsPaginator.loadNext();
          //scope.commentsPaginator.watch(scope,'commentsPaginator.items.length');
        };
      }
    };
  }]);
