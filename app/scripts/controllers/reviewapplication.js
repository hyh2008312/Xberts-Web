'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ReviewCtrl
 * @description
 * # ReviewCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewapplicationCtrl', ['$scope', '$rootScope', 'review', 'reviewer', function ($scope, $rootScope, review, reviewer) {
    // todo:每个人只能填写一份调查问卷
    $scope.review = review;
    $scope.profile = reviewer;
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
      console.log(step);
      $scope.$broadcast('stepBroadcast', step);
    };
  }]);
