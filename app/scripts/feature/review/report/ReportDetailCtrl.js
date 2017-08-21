'use strict';

angular.module('xbertsApp')
  .controller('ReportDetailCtrl',['$scope', '$rootScope', '$stateParams', 'report', 'ReviewReport', 'growl', 'InviteService',
    'BrowserUtil','ExpertService',
    function ($scope, $rootScope, $stateParams, report, ReviewReport, growl, InviteService, BrowserUtil,ExpertService) {
    $scope.report = report;

    $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === report.getReviewerId();

    $scope.expert = {
      userId: report.getReviewerId()
    };

    ExpertService.getAchievement(report.getReviewerId()).then(function(data) {
      $scope.achievement = data;
    });

    var title = report.title;
    var description = report.description;
    var backgroundColor = 'background-bg-light';
    var shareImage = report.image_origin;
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

    $scope.isFacebookApp = BrowserUtil.isFacebookApp();

    $scope.approve = function () {
      $scope.$emit('backdropOn', 'approve project');
      ReviewReport.patch({id: report.id, reviewId: $stateParams.reviewId}, {is_approved: 'PENDING'}, function () {
        $scope.$emit('backdropOff', 'success');
        growl.success('review report is approved.');
      })
    };

  }]);
