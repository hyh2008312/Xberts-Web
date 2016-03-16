'use strict';

angular.module('xbertsApp')
  .controller('LaunchprojectCtrl', ['$scope', '$rootScope', '$stateParams', 'localStorageService',
    function ($scope, $rootScope, $stateParams, localStorageService) {
      $scope.projectId = $stateParams.projectId || null;
      $scope.redirect = false;
      $rootScope.pageSettings.setBackgroundColor('background-whitem');
      $scope.tabs = [
        {active: true, disable: false},
        {active: false, disable: true},
        {active: false, disable: true},
        {active: false, disable: true}
      ];
      $scope.$on('projectStep', function (e, d) {
        var step = Number(d);
        $scope.tabs[step + 1].disable = false;
        $scope.tabs[step + 1].active = true;
        if (step == 2) {
          $scope.redirect = true;
        }
      });
      $scope.$on('projectId', function (e, d) {
        $scope.projectId = Number(d);
      });
      $scope.select = function (step) {
        $scope.$broadcast('stepBroadcast', step);
      };
      localStorageService.clearAll();
    }]);
