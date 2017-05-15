'use strict';

angular.module('xbertsApp')
  .controller('ReportDetailCtrl',['$scope', '$rootScope', '$stateParams', 'report', 'ReviewReport', 'growl', 'InviteService',
    'BrowserUtil',
    function ($scope, $rootScope, $stateParams, report, ReviewReport, growl, InviteService, BrowserUtil) {
    $scope.report = report;

    var title = report.title;
    var description = report.description;
    var backgroundColor = 'background-bg-white';
    var shareImage = report.image;
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
