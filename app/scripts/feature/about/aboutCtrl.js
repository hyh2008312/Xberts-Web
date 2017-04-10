'use strict';

angular.module('xbertsApp')
  .controller('AboutCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
      $rootScope.pageSettings.setTitle('About Xberts');
      $rootScope.pageSettings.setBackgroundColor('background-bg-white');
    }]);
