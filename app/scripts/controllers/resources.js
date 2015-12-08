'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ResourceCtrl
 * @description
 * # ResourceCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ResourcesCtrl', ['$scope', '$state', 'modalWrap', 'Event', 'Expert', function ($scope, $state, modalWrap, Event, Expert) {
    $scope.events = [];
    $scope.experts = [];
    Event.get(function (events) {
      $scope.events = events.results;
    });
    Expert.get({recommended:'True'},function (experts) {
      $scope.experts = experts.results;
    });

    $scope.items = ['item1', 'item2', 'item3'];

    //var requestModal = new modalWrap('views/requestmodal.html', 'RequestModalCtrl');
    //$scope.openRequestModal = function () {
    //  requestModal.open('lg',
    //    {},
    //    function (submit) {
    //    },
    //    function (cancle) {
    //    }
    //  );
    //};
  }])
  .controller('RequestModalCtrl', ['$scope', '$modalInstance', 'Contact', function ($scope, $modalInstance, Contact) {
    $scope.contact = new Contact();
    $scope.contactSubmit = function () {
      if ($scope.contactForm.$valid) {
        $scope.$emit('backdropOn','aaa');
        $scope.contact.$save(function (contact) {
          $scope.$emit('backdropOff','bbb');
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
