'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('MainCtrl', ['$scope', '$state', 'modalWrap', 'projectPaginator', 'eventPaginator', 'expertPaginator',
    function ($scope, $state, modalWrap, projectPaginator, eventPaginator, expertPaginator) {
      $scope.eventPaginator = eventPaginator;
      $scope.projectPaginator = projectPaginator;
      $scope.expertPaginator = expertPaginator;
    }])
  .controller('RequestModalCtrl', ['$scope', '$modalInstance', 'Contact', function ($scope, $modalInstance, Contact) {
    $scope.contact = new Contact();
    $scope.contactSubmit = function () {
      if ($scope.contactForm.$valid) {
        $scope.$emit('backdropOn', 'aaa');
        $scope.contact.$save(function (contact) {
          $scope.$emit('backdropOff', 'bbb');
          $modalInstance.close(contact);
        });
        return false;

      } else {
        $scope.contactForm.submitted = true;
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
