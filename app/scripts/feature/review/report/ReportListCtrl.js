'use strict';

angular.module('xbertsApp')
.controller('ReportListCtrl', ['$scope', '$rootScope', 'reviewPaginator', 'topReviewPaginator',
  function ($scope, $rootScope, reviewPaginator, topReviewPaginator) {

    var backgroundColor = 'background-bg-light';
    $rootScope.pageSettings.setBackgroundColor('backgroundColor');
    $scope.reviewPaginator = reviewPaginator;
    $scope.topReviewPaginator = topReviewPaginator;
    $rootScope.pageSettings.setPage();
  }]);
