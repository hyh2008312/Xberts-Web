'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:RequestinfoCtrl
 * @description
 * # RequestinfoCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('RequestinfoCtrl', ['$scope', 'SystemData', 'Distribution', function ($scope, SystemData, Distribution) {

    var parseDiscount = function (sDiscounts) {
      var sItems = sDiscounts.split(",");
      var items = [];
      for (var j = 0; j < sItems.length; j++) {
        var discount = {};
        var item = sItems[j].split("#");
        discount.price_discount = item[0];
        discount.order_quantity = item[1];
        items.push(discount);
      }
      return items;
    };

    $scope.$on('stepBroadcast', function (e, d) {
      d=Number(d);
      if (d === 2) {
        $scope.$emit('backdropOn', 'query distributions');
        Distribution.query({project_id: $scope.projectId}, function (results) {
          if (results.length < 1) {
            $scope.distribution = new Distribution();
            $scope.distribution.project = $scope.projectId;
          } else {
            //todo:one project can create multiple distribution
            $scope.distribution = results[0];
            SystemData.stringParseToCheckboxes($scope.distribution.target_geo, $scope.targetGeos);
            SystemData.stringParseToCheckboxes($scope.distribution.supported, $scope.supportTypes);
            $scope.discounts = parseDiscount($scope.distribution.discount);
          }
          $scope.$emit('backdropOff', 'query distributions finished');
        }, function (error) {
          alert("Some error happened");
          console.log(error);
          $scope.$emit('backdropOff', 'query distributions error');
        })
      }
    });

    $scope.targetGeos = SystemData.getTargetGeos();
    $scope.supportTypes = SystemData.getSupportTypes();
    $scope.transportationModels = SystemData.getTransportationModels();
    $scope.discounts = [];
    $scope.discount = {};

    $scope.addDiscount = function () {
      if ($scope.distributionForm.price_discount.$invalid || $scope.distributionForm.order_quantity.$invalid) {
        return false;
      }
      if ($scope.discount.price_discount && $scope.discount.order_quantity) {
        $scope.discounts.push($scope.discount);
        $scope.distributionForm.discountError = false;
        $scope.discount = {};
      } else {
        $scope.distributionForm.discountError = true;
      }

    };
    $scope.removeDiscount = function (index) {
      $scope.discounts.splice(index, 1)
    };

    $scope.distributionFormSubmit = function () {
      var targetGeos = [], supportTypes = [], discounts = [];
      for (var i = 0; i < $scope.targetGeos.length; i++) {
        if ($scope.targetGeos[i].selected) {
          targetGeos.push($scope.targetGeos[i].id);
        }
      }
      for (var j = 0; j < $scope.supportTypes.length; j++) {
        if ($scope.supportTypes[j].selected) {
          supportTypes.push($scope.supportTypes[j].id);
        }
      }
      if ($scope.discount.price_discount && $scope.discount.order_quantity) {
        $scope.discounts.push($scope.discount);
        $scope.discount = {};
      }
      for (var p = 0; p < $scope.discounts.length; p++) {
        discounts.push($scope.discounts[p].price_discount + '#' + $scope.discounts[p].order_quantity);
      }


      $scope.distributionForm.targetGeosRequired = (targetGeos.length < 1);
      $scope.distributionForm.discountRequired = ($scope.discounts.length < 1);
      if ($scope.distributionForm.$valid && !$scope.distributionForm.targetGeosRequired && !$scope.distributionForm.discountRequired) {

        $scope.$emit('backdropOn', 'post');

        //project pre process
        $scope.distribution.target_geo = targetGeos.join();
        $scope.distribution.supported = supportTypes.join();
        $scope.distribution.discount = discounts.join();


        if ($scope.distribution.id) {
          $scope.distribution.$put(function (resp) {
            $scope.$emit('backdropOff', 'success');
            $scope.$emit('projectStep', '2');
          }, function (resp) {
            alert('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'error');
            console.log(resp);
          });
        } else {
          $scope.distribution.$save(function (resp) {
            $scope.$emit('backdropOff', 'success');
            $scope.$emit('projectStep', '2');
          }, function (resp) {
            alert('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'error');
            console.log(resp);
          });
        }
        return false;

      } else {
        $scope.distributionForm.submitted = true;
        $scope.distributionForm.$invalid = true;
      }
    };
  }]);
