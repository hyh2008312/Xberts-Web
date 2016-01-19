'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ReviewinfoCtrl
 * @description
 * # ReviewinfoCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewapplicationinfoCtrl', ['$scope', 'ReviewApplicant', '$filter',
    function ($scope, ReviewApplicant, $filter) {
      $scope.reviewFormSubmit = function () {
        if ($scope.reviewForm.$valid) {
          var answer = {};
          for (var x = 0; x < $scope.review.surveys.length; x++) {
            for (var y = 0; y < $scope.review.surveys[x].questions.length; y++) {
              answer['question_' + $scope.review.surveys[x].questions[y].id] = $scope.review.surveys[x].questions[y].answer;
            }
          }
          ReviewApplicant.getApplication().answer = $filter('json')(answer);

          $scope.$emit('reviewStep', '1');

          return false;

        } else {
          $scope.reviewForm.submitted = true;
          $scope.reviewForm.$invalid = true;
        }
      };
    }]);
