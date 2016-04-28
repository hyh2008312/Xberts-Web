'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ReviewprojectCtrl
 * @description
 * # ReviewprojectCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewprojectCtrl', function ($rootScope, $scope, $document, $filter, review, Applicantsreview, reportPaginator) {
    $scope.review = review;
    $scope.reportPaginator = reportPaginator;
    $scope.applicantsSearch = {is_selected: true, is_exempted: false};

    var title = "We're now calling for reviewers to test-drive our new product:" + review.project.name;
    var description = review.project.description;
    var backgroundColor = 'background-whitem';
    var shareImage = review.project.image;
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);

    $scope.applicant = {exist: false, is_selected: false, is_submit_report: false};
    $scope.sub = {
      subNavShow: false
    };
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
  })
  .controller('ReviewProjectsCtrl', ['$scope', '$rootScope', 'SystemData', 'projectReviewPaginator',
    function ($scope, $rootScope, SystemData, projectReviewPaginator) {

      var title = 'Xberts - Crowdtesting';
      var description = 'Receive free samples of new products to test and review!Launch a Campaign';
      var backgroundColor = '';
      var shareImage = 'https://xberts.com/media/project/2016/03/11/3I9WcKxdVp.png';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);
      $scope.projectReviewPaginator = projectReviewPaginator;
    }]);
