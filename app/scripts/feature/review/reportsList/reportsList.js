'use strict';

angular.module('xbertsApp')
  .directive('reviewReportsList', ['$rootScope', 'ReviewService','ReviewReport',
    function ($rootScope, ReviewService,ReviewReport) {
    return {
      restrict: 'E',
      scope: {
        reviews: '=',
        admin: '=',
        index: '='
      },
      templateUrl: 'scripts/feature/review/reportsList/reports-list.html',
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

        scope.updateApprove = function(report) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          ReviewReport.patch({id: report.id, reviewId: report.getReviewId()}, {is_approved: report.is_approved}, function () {

          });
        };

        scope.updateSkipped = function(report) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          report.skipped = !report.skipped;
          ReviewReport.patch({id: report.id, reviewId: report.getReviewId()}, {skipped: report.skipped}, function () {

          });
        };

        scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          //you also get the actual event object
          //do stuff, execute functions -- whatever...

          if(scope.index == 3) {
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

