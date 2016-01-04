'use strict';

angular.module('xbertsApp')
  .controller('CompanyinfoCtrl', ['$scope', 'Organization', '$rootScope', 'growl',
    function ($scope, Organization, $rootScope, growl) {
    var company = new Organization({id: $rootScope.user.getUserId()});
    $scope.$emit('backdropOn', 'query company');
    company.$get(function (result) {
      $scope.$emit('backdropOff', 'query company completed');
      $scope.company = result;
    }, function (result) {
      $scope.$emit('backdropOff', 'query company completed');
      $scope.company = new Organization();
    });

    $scope.companyFormSubmit = function () {
      if ($scope.companyForm.$valid) {
        $scope.$emit('backdropOn', 'post');

        //upload json-data
        if ($scope.company.id) {
          $scope.company.$put(function (resp) {
            $scope.$emit('backdropOff', 'success');
            $scope.$emit('projectStep', '1');
          }, function (resp) {
            growl.error('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'error');
            console.log(resp);
          });
        } else {
          $scope.company.$save(function (resp) {
            $scope.$emit('backdropOff', 'success');
            $scope.$emit('projectStep', '1');
          }, function (resp) {
            growl.error('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'error');
            console.log(resp);
          });
        }

        return false;

      } else {
        $scope.companyForm.submitted = true;
      }
    };
  }]);
