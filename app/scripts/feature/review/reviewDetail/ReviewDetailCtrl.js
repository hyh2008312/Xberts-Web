'use strict';

angular.module('xbertsApp')
  .controller('ReviewDetailCtrl',['$scope', '$rootScope', '$stateParams', 'report', 'ReviewReport', 'growl', 'InviteService',
    'ExpertService','blogPaginator', 'ReviewService',
    function ($scope, $rootScope, $stateParams, report, ReviewReport, growl, InviteService,ExpertService,blogPaginator,
              ReviewService) {

      report.details = report.details.replace(/pre-loading/ig, "");
      report.details = report.details.replace(/(<p><br><\/p>){3,}/ig, "<p><br></p>");


      $scope.report = ReviewService.blogReport(report);

      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === report.owner.id;

      $scope.expert = {
        userId: report.owner.id
      };

      $scope.blogPaginator = blogPaginator;

      ExpertService.getAchievement(report.owner.id).then(function(data) {
        $scope.achievement = data;
      });

      var title = report.title;
      var description = report.description;
      var backgroundColor = 'background-bg-white';
      var shareImage = report.getBlogsImage(report.cover, 'BLOG_COVER');
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

      // FAB Speed Dial Component
      // Set the component to the normal state
      $scope.hidden = false;
      $scope.isOpen = false;
      $scope.hover = false;
      $scope.shareList = [
        { name: "facebook" },
        { name: "twitter"},
        { name: "linkedin"}
      ];

      $scope.inviteObj = angular.copy(InviteService, {});

      $scope.commentToggle = false;

      $scope.onToggleDown = function() {
        $scope.commentToggle = !$scope.commentToggle;
      };



    }]);
