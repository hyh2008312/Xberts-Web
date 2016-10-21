'use strict';
angular.module('xbertsApp')
  .controller('ShareController', ['$scope','$uibModalInstance','socialContent', function ($scope,$uibModalInstance,socialContent) {

    $scope.ok = function () {
      $uibModalInstance.close('YES');
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('NO');
    };

    $scope.socialContent=socialContent;

  }])
  .factory('XBSocialShare', ['$uibModal','$state', function ($uibModal,$state) {

    var open = function (size,socialContent,redirectState,redirectStateParam) {

      var modalInstance = $uibModal.open({
        templateUrl: 'views/modal/share.html',
        controller: 'ShareController',
        size: size,
        resolve: {
          socialContent:socialContent
        }
      });
      modalInstance.result.then(function (result) {
        $state.go(redirectState,redirectStateParam);
      }, function (value) {
        console.info('Modal closed: ' + value);
      });
    };

    return {
      open:open
    }
  }]);
