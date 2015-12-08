'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:DistributorCtrl
 * @description
 * # DistributorCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('DistributorCtrl', function ($scope, SystemData, Distributor, $uibModalInstance, distribution) {
    $scope.distribution = distribution;
    $scope.saleChannels = SystemData.getSaleChannels();

    $scope.distributor = new Distributor();
    $scope.distributorFormSubmit = function () {
      var saleChannels = [];
      for (var i = 0; i < $scope.saleChannels.length; i++) {
        if ($scope.saleChannels[i].selected) {
          saleChannels.push($scope.saleChannels[i].id);
        }
      }
      $scope.distributorForm.saleChannelsRequired = (saleChannels.length < 1);
      if ($scope.distributorForm.$valid && !$scope.distributorForm.saleChannelsRequired) {
        $scope.$emit('backdropOn', 'post');
        //project pre process
        $scope.distributor.sale_channels = saleChannels.join();
        $scope.distributor.request = $scope.distribution.id;
        console.log($scope.distributor);

        $scope.distributor.$save(function (resp) {
          $scope.$emit('backdropOff', 'success');
          $uibModalInstance.dismiss();
        }, function (resp) {
          alert('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'error');
          console.log(resp);
        });

      } else {
        $scope.distributorForm.submitted = true;
        $scope.distributorForm.$invalid = true;
      }
    };
  });
