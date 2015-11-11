'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('MainCtrl', ['$scope', '$state', 'modalWrap', 'ProjectsNoDetail', 'EventNoDetail', 'Expert',
    function ($scope, $state, modalWrap, ProjectsNoDetail, EventNoDetail, Expert) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      $scope.projects = [];
      $scope.events = [];
      $scope.experts = [];
      ProjectsNoDetail.get(function (projects) {
        $scope.projects = projects.results;
      });
      EventNoDetail.get(function (events) {
        $scope.events = events.results;
      });
      Expert.get({recommended: 'True'}, function (experts) {
        $scope.experts = experts.results;
      });

      $scope.items = ['item1', 'item2', 'item3'];

      var requestModal = new modalWrap('views/requestmodal.html', 'RequestModalCtrl');
      $scope.openRequestModal = function () {
        requestModal.open('lg',
          {
            //items: function () {
            //  return $scope.items;
            //}
          },
          function (submit) {
            //console.log(submit);
          },
          function (cancle) {
          }
        );
      };
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
