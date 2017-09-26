'use strict';

angular.module('xbertsApp')
  .directive('blogsList', ['$rootScope', 'ReviewService',function ($rootScope, ReviewService) {
    return {
      restrict: 'E',
      scope: {
        reviews: '=',
        admin: '=',
        index: '='
      },
      templateUrl: 'scripts/feature/review/blogsList/blogs-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.user = $rootScope.user;

        scope.changeOrder  = function($index) {
          return Math.floor($index / 8);
        };

        scope.approveList = [{
          value: 'PENDING'
        }, {
          value: 'APPROVED'
        }, {
          value: 'DISAPPROVED'
        }];

        scope.updateApprove = function(blog) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          ReviewService.updateBlog(blog).then(function(data) {

          });
        };

        scope.updateSkipped = function(blog) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          blog.skipped = !blog.skipped;
          ReviewService.setBlogSkip(blog).then(function(data) {

          });
        };

        scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          //you also get the actual event object
          //do stuff, execute functions -- whatever...

          if(scope.index == 2) {
            angular.forEach(scope.reviews,function(e) {
              if(e.skipped == null) {
                e.skipped = true;
              }
            });
          }

        });

      }
    }
  }]);

