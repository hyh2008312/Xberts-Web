'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:DistributorCtrl
 * @description
 * # DistributorCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('DistributorCtrl', function ($scope, SystemData, Distributor, $uibModalInstance, distribution, growl) {
    $scope.distribution = distribution;
    $scope.saleChannels = SystemData.getSaleChannels();

    $scope.distributor = new Distributor();
    function salesRequired() {
      $scope.saleChannelSelected = [];
      for (var i = 0; i < $scope.saleChannels.length; i++) {
        if ($scope.saleChannels[i].selected) {
          $scope.saleChannelSelected.push($scope.saleChannels[i].id);
        }
      }
      return $scope.saleChannelSelected.length < 1;
    }

    $scope.distributorFormSubmit = function () {
      $scope.distributorForm.saleChannelsRequired = salesRequired();
      if ($scope.distributorForm.$valid && !$scope.distributorForm.saleChannelsRequired) {
        $scope.$emit('backdropOn', 'post');
        //project pre process
        $scope.distributor.sale_channels = $scope.saleChannelSelected.join();
        $scope.distributor.request = $scope.distribution.id;
        console.log($scope.distributor);

        $scope.distributor.$save(function (resp) {
          $scope.$emit('backdropOff', 'success');
          growl.success('Thanks, your application has been submitted successfully!');
          $uibModalInstance.dismiss();
        }, function (resp) {
          growl.error('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'error');
          console.log(resp);
        });

      } else {
        $scope.distributorForm.submitted = true;
        $scope.distributorForm.$invalid = true;
      }
    };

    $scope.$watch(salesRequired, function () {
      $scope.distributorForm.saleChannelsRequired = salesRequired();
    })
  });
