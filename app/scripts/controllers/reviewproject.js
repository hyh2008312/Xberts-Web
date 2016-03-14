'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ReviewprojectCtrl
 * @description
 * # ReviewprojectCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewprojectCtrl', function ($rootScope, $scope, $document, $filter, review, Applicantsreview) {
    $scope.review = review;
    $scope.applicantsSearch = {is_selected: true};
    $rootScope.bodyBackground = 'background-whitem';
    $scope.sub = {
      subNavShow: false
    };
    $scope.isOutDated = function (time) {
      return Date.now() - new Date(time) > 0;
    };
    console.log(Date.now());
    console.log(new Date($scope.review.application_end_date));
    console.log($scope.isOutDated($scope.review.application_end_date));
    console.log($scope.review.is_publish_applicants);
    $scope.isApplicantsSelectionButtonActive = $scope.isOutDated($scope.review.application_end_date) && !$scope.review.is_publish_applicants;
    $scope.isReportsReviewButtonActive = $scope.isOutDated($scope.review.date_end);
    $scope.applicant = {exist: false, is_selected: false, is_submit_report: false};
    if ($rootScope.user.isAuth()) {
      Applicantsreview.get({
        review_id: $scope.review.id,
        reviewer_id: $rootScope.user.getUserId()
      }, function (data) {
        if (data.count !== undefined && data.count > 0) {
          angular.extend($scope.applicant, data.results[0]);
          $scope.applicant.exist = true;
        }
      }, function () {

      })
    }
    var section2 = angular.element(document.getElementById('section-2'));
    var section3 = angular.element(document.getElementById('section-3'));
    var section4 = angular.element(document.getElementById('section-4'));
    var section5 = angular.element(document.getElementById('section-5'));
    $scope.toSection4 = function () {
      $document.scrollToElementAnimated(section4);
    };
    $scope.toSection5 = function () {
      $document.scrollToElementAnimated(section5);
    };
    $scope.toSection3 = function () {
      $document.scrollToElementAnimated(section3);
    };
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
  .controller('ReviewProjectsCtrl', ['$scope','$rootScope', 'SystemData', 'projectReviewPaginator',
    function ($scope,$rootScope, SystemData, projectReviewPaginator) {
      $rootScope.bodyBackground = '';
      $scope.projectReviewPaginator = projectReviewPaginator;
      $scope.projectReviewPaginator.watch($scope, 'projectReviewPaginator.currentPage');
      $scope.isOutDated = function (time) {
        return Date.now() - new Date(time) > 0;
      };
      $scope.slides = [
        {
          image: '/images/mo_review.jpg',
          title: '',
          subtitle: '',
          buttonText: 'Apply Now',
          buttonColor: 'btn-primary',
          url: 'application.review({reviewId:9})'
        }
      ];
    }]);
