'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:ReviewCtrl
 * @description
 * # ReviewCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('ReviewCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.bodyBackground = 'background-whitem';
  });
