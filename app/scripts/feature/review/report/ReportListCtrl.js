'use strict';

angular.module('xbertsApp')
.controller('ReportListCtrl', ['$scope', '$rootScope', 'reviews', 'topReviewers',
  function ($scope, $rootScope, reviews, topReviewers) {
    $scope.reviews = reviews;
    $scope.topReviewers = topReviewers.items;

    var title = 'Reviews – Unbiased product reviews from our community';
    var description = 'Explore new products reviewed by our community users. Share the good ones with your friends so ' +
      'they can make smarter purchasing decisions.';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);
