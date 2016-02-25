'use strict';

angular.module('xbertsApp')
  .controller('RequestinfoCtrl', ['$scope', 'SystemData', 'Distribution', 'growl', function ($scope, SystemData, Distribution, growl) {

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
    var tagsParse = function (tagstring) {
      var tags = [];
      if (tagstring === undefined || tagstring === null || tagstring === "") {
        return tags;
      } else {
        var tagsTemp = tagstring.split(',');
        for (var i = 0; i < tagsTemp.length; i++) {
          var tag = {};
          tag.text = tagsTemp[i];
          tags.push(tag);
        }
        return tags;
      }
    };
    $scope.distributionTemp = {tags: []};


    $scope.$on('stepBroadcast', function (e, d) {
      d = Number(d);
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
            //SystemData.stringParseToCheckboxes($scope.distribution.supported, $scope.supportTypes);
            $scope.discounts = parseDiscount($scope.distribution.discount);
            $scope.distributionTemp.tags = tagsParse($scope.distribution.tags);

          }
          $scope.$emit('backdropOff', 'query distributions finished');
        }, function (error) {
          growl.error('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'query distributions error');
        });
      }
    });
    $scope.targetGeos = SystemData.getTargetGeos();
    //$scope.supportTypes = SystemData.getSupportTypes();
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
      $scope.discounts.splice(index, 1);
    };

    $scope.distributionFormSubmit = function () {
      var targetGeos = [], supportTypes = [], discounts = [];
      for (var i = 0; i < $scope.targetGeos.length; i++) {
        if ($scope.targetGeos[i].selected) {
          targetGeos.push($scope.targetGeos[i].id);
        }
      }
      //for (var j = 0; j < $scope.supportTypes.length; j++) {
      //  if ($scope.supportTypes[j].selected) {
      //    supportTypes.push($scope.supportTypes[j].id);
      //  }
      //}
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

        var tags = [];
        for (var i = 0; i < $scope.distributionTemp.tags.length; i++) {
          tags.push($scope.distributionTemp.tags[i].text);
        }
        $scope.distribution.tags = tags.join(',');

        $scope.$emit('backdropOn', 'post');

        //project pre process
        $scope.distribution.target_geo = targetGeos.join();
        //$scope.distribution.supported = supportTypes.join();
        $scope.distribution.discount = discounts.join();


        if ($scope.distribution.id) {
          $scope.distribution.$put(function (resp) {
            $scope.$emit('backdropOff', 'success');
            $scope.$emit('projectStep', '2');
          }, function (resp) {
            growl.error('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'error');
          });
        } else {
          $scope.distribution.$save(function (resp) {
            $scope.$emit('backdropOff', 'success');
            $scope.$emit('projectStep', '2');
          }, function (resp) {
            growl.error('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'error');
          });
        }
        return false;

      } else {
        $scope.distributionForm.submitted = true;
        $scope.distributionForm.$invalid = true;
      }
    };
  }])
  .controller('ReviewRequestCtrl', ['$rootScope', '$scope', 'SystemData', 'SystemConstant', 'Configuration', '$resource',
    'uibDateParser', 'growl', '$timeout', '$state',
    function ($rootScope, $scope, SystemData, SystemConstant, Configuration, $resource, uibDateParser, growl, $timeout, $state) {

      $rootScope.bodyBackground = 'background-whitem';
      $scope.targetGeos = SystemData.getTargetGeos();
      $scope.format = 'yyyy/MM/dd';
      $scope.PRODUCT_STAGE = SystemConstant.PRODUCT_STAGE;
      $scope.datePickerStatus = false;
      $scope.open = function () {
        $scope.datePickerStatus = true;
      };
      var ReviewRequest = $resource(Configuration.apiBaseUrl + '/review/review_request/');
      $scope.review = new ReviewRequest();
      if ($scope.review.date_estimated) {
        $scope.review.date_estimated = new Date($scope.review.date_estimated);
      }
      var referenceId = 'review_request';
      $scope.reviewFormSubmit = function () {
        $scope.reviewForm.phoneError = !$scope.review.contact_number;
        console.log($scope.review);
        if ($scope.reviewForm.$valid && !$scope.reviewForm.targetGeosRequired && !$scope.reviewForm.phoneError) {

          $scope.$emit('backdropOn', 'post');

          //project pre process
          $scope.review.target_geo = $scope.targetsSelected.join();
          $scope.review.$save(function (resp) {
            $scope.$emit('backdropOff', 'success');
            $scope.review.date_estimated = new Date($scope.review.date_estimated);
            growl.success('Your Request has been successfully submitted.', {referenceId: referenceId});
            $timeout(function () {
              $state.go('application.main');
            }, 2000);
          }, function (resp) {
            growl.error('Sorry,some error happened.', {referenceId: referenceId});
            $scope.$emit('backdropOff', 'error');
          });
          return false;

        } else {
          $scope.reviewForm.submitted = true;
          $scope.reviewForm.$invalid = true;
        }
      };
      function targetRequired() {
        $scope.targetsSelected = [];
        for (var i = 0; i < $scope.targetGeos.length; i++) {
          if ($scope.targetGeos[i].selected) {
            $scope.targetsSelected.push($scope.targetGeos[i].name);
          }
        }
        return $scope.targetsSelected.length;
      }

      $scope.$watch(targetRequired, function () {
        $scope.reviewForm.targetGeosRequired = $scope.targetsSelected.length < 1;
      })
    }]);
