'use strict';

angular.module('xbertsApp')
  .controller('MyTrialsCtrl', ['$scope', '$rootScope','reviewApplicantPaginator',
    function ($scope, $rootScope,reviewApplicantPaginator) {
      $rootScope.pageSettings.setBackgroundColor('background-bg-light');
      $scope.reviewApplicantPaginator = reviewApplicantPaginator;
    }]);
