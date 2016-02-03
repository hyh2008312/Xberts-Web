'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ReviewCtrl
 * @description
 * # ReviewCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewapplicationCtrl', ['$scope', '$rootScope', 'review', 'reviewer', 'application',
    function ($scope, $rootScope, review, reviewer, application) {
      $scope.application = application;
      // todo:每个人只能填写一份调查问卷
      $scope.review = review;
      $scope.profile = reviewer;
      console.log(reviewer);

      //padding answer to review.survey
      if (application.id) {
        var answer = JSON.parse(application.answer);
        for (var i = 0; i < $scope.review.surveys.length; i++) {
          for (var j = 0; j < $scope.review.surveys[i].questions.length; j++) {
            var questionId = $scope.review.surveys[i].questions[j].id;
            $scope.review.surveys[i].questions[j]['answer'] = answer['question_' + questionId] || {};
          }
        }
      }
      if ($scope.profile.birth !== null) {
        $scope.profile.birth = new Date($scope.profile.birth);
      }
      $scope.profile.linkedin = true;
      $scope.redirect = false;
      $rootScope.bodyBackground = 'background-whitem';
      $scope.tabs = [
        {active: true, disable: false},
        {active: false, disable: true},
        {active: false, disable: true},
        {active: false, disable: true}
      ];
      $scope.$on('reviewStep', function (e, d) {
        var step = Number(d);
        $scope.tabs[step + 1].disable = false;
        $scope.tabs[step + 1].active = true;
        if (step === 2) {
          $scope.redirect = true;
          $scope.tabs[0].disable = true;
          $scope.tabs[1].disable = true;
          $scope.tabs[2].disable = true;
        }
        e.stopPropagation();
      });
      $scope.select = function (step) {
        $scope.$broadcast('stepBroadcast', step);
      };
    }])
  .controller('ReviewApplicantsCtrl', ['$scope', 'review', function ($scope, review) {
    $scope.review = review;
  }]);
