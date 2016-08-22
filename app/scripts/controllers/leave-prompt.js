'use strict';

angular.module('xbertsApp')
  .controller('LeavePromptController', ['$scope', '$uibModalInstance', 'title',
    function ($scope, $uibModalInstance, title) {
      $scope.title = title;
      $scope.ok = function () {
        $uibModalInstance.close('YES');
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('NO');
      };
    }])
  .controller('AboutCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
      $rootScope.pageSettings.setTitle('About Xberts');
      $rootScope.pageSettings.setBackgroundColor('background-bg-gray');
    }]);
