'use strict';

angular.module('xbertsApp')
  .controller('MyBiographyCtrl', ['$scope', '$rootScope','expert',
    function ($scope, $rootScope,expert) {
      $rootScope.pageSettings.setBackgroundColor('background-bg-light');
      $scope.biography = expert.biography;
    }]);
