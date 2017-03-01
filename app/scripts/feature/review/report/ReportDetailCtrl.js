'use strict';

angular.module('xbertsApp')
  .controller('ReportDetailCtrl',['$scope', '$rootScope', '$stateParams', 'report', 'ReviewReport', 'growl', function ($scope, $rootScope, $stateParams, report, ReviewReport, growl) {
    $scope.report = report;

    var title = report.title;
    var description = report.description;
    var backgroundColor = 'background-bg-white';
    var shareImage = report.image;
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);



    $scope.approve = function () {
      $scope.$emit('backdropOn', 'approve project');
      ReviewReport.patch({id: report.id, reviewId: $stateParams.reviewId}, {is_approved: 'PENDING'}, function () {
        $scope.$emit('backdropOff', 'success');
        growl.success('review report is approved.');
      })
    };

  }]);
