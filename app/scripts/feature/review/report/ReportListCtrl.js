'use strict';

angular.module('xbertsApp')
.controller('ReportListCtrl', ['$scope', '$rootScope', 'reviews', 'topReviewers',
  function ($scope, $rootScope, reviews, topReviewers) {
    $scope.reviews = reviews;
    $scope.topReviewers = topReviewers.items;

    var title = 'Trials – Try latest gadgets';
    var description = 'Try the coolest products for Free or with Deep Discount, and share your reviews with our community. ';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
