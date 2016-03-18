'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ReviewinfoCtrl
 * @description
 * # ReviewinfoCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewapplicationinfoCtrl', ['$scope', '$location', 'ReviewApplicant', '$filter', 'AnalyticsService',
    function ($scope, $location, ReviewApplicant, $filter, AnalyticsService) {

      $scope.reviewFormSubmit = function () {
        $scope.error = false;
        var x, y;
        for (x = 0; x < $scope.review.surveys.length; x++) {
          for (y = 0; y < $scope.review.surveys[x].questions.length; y++) {
            $scope.error = $scope.error || $scope.review.surveys[x].questions[y].error;
          }
        }
        if ($scope.reviewForm.$valid && !$scope.error) {
          var answer = {};
          for (x = 0; x < $scope.review.surveys.length; x++) {
            for (y = 0; y < $scope.review.surveys[x].questions.length; y++) {
              answer['question_' + $scope.review.surveys[x].questions[y].id] = $scope.review.surveys[x].questions[y].answer;
            }
          }
          ReviewApplicant.getApplication().answer = $filter('json')(answer);

          $scope.$emit('reviewStep', '1');

          AnalyticsService.sendPageView($location.path() + '/confirm');

          return false;

        } else {
          $scope.reviewForm.submitted = true;
          $scope.reviewForm.$invalid = true;
        }
      };
    }]);
