'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('EventCtrl', ['$scope','$rootScope','Paginator','ProjectsNoDetail', '$stateParams', 'event', function ($scope,$rootScope,Paginator,ProjectsNoDetail, $stateParams, event) {
    $rootScope.bodyBackground = 'background-whitem';
    $scope.register = {
      status: false
    };
    $scope.onRegisterToggle = function () {
      $scope.register.status = !$scope.register.status;
    };
    $scope.event = event;
    var fetchFunction = function (nextPage, otherParams, callback) {
      var params = {page: nextPage};
      angular.extend(params, otherParams);
      ProjectsNoDetail.get(params, callback);

    };
    $scope.projectPaginator = Paginator('event_project_'+event.id, fetchFunction);
    $scope.projectPaginator.loadNext();
  }]);
