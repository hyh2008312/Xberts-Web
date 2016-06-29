'use strict';

angular.module('xbertsApp')
  .controller('SaleListController', ['$scope', '$rootScope', 'SystemData', 'salesPaginator',
    function ($scope, $rootScope, SystemData, salesPaginator) {

      $rootScope.pageSettings.setBackgroundColor('');

      $scope.projectTypes = SystemData.getProjectTypes();
      $scope.salesPaginator = salesPaginator;
    }]);
