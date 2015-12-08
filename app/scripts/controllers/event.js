'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('EventCtrl', ['$scope', '$stateParams', 'event', function ($scope, $stateParams, event) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.register = {
      status: false
    };
    $scope.onRegisterToggle = function () {
      $scope.register.status = !$scope.register.status;
    };
    $scope.event = event;
  }]);
