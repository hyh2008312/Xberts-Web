'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ReviewprojectCtrl
 * @description
 * # ReviewprojectCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewprojectCtrl', function ($rootScope, $scope, $document, review) {
    $scope.review = review;
    $rootScope.bodyBackground = 'background-whitem';
    $scope.sub = {
      subNavShow: false
    };
    var section3 = angular.element(document.getElementById('section-3'));
    $scope.toSection3 = function () {
      $document.scrollToElementAnimated(section3);
    };
    var section2 = angular.element(document.getElementById('section-3'));
    $scope.toSection2 = function () {
      $document.scrollToElementAnimated(section2);
    };
    $rootScope.$on('duScrollspy:becameActive', function ($event, $element, $target) {
      if ($target.context.id === 'section-1') {
        $scope.$apply(function () {
          $scope.sub.subNavShow = false;
        });
      } else {
        $scope.$apply(function () {
          $scope.sub.subNavShow = true;
        });
      }
    });
  })
  .controller('ReviewProjectsCtrl', ['$scope', 'SystemData', 'projectReviewPaginator',
    function ($scope, SystemData, projectReviewPaginator) {
      $scope.projectReviewPaginator = projectReviewPaginator;
      $scope.projectReviewPaginator.watch($scope, 'projectReviewPaginator.currentPage');
    }]);
