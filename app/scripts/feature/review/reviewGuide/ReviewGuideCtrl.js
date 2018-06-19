'use strict';

angular.module('xbertsApp')
  .controller('ReviewGuideCtrl', ['$rootScope', '$scope', 'review',
    function ($rootScope, $scope, review) {
      $scope.review = review;

      var title = review.title;
      var description = review.project.description;
      var backgroundColor = 'background-bg-light';
      var shareImage = review.project.mainImage;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);


    }]);
