'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('ProjectCtrl', ['$scope', '$rootScope', '$stateParams', 'SystemData', 'Interact', 'ProjectOnlyDetail','project', 'distributions',
    function ($scope, $rootScope, $stateParams, SystemData, Interact, ProjectOnlyDetail,project, distributions) {
      $rootScope.bodyBackground = 'background-whitem';

      $scope.projectTypes = SystemData.getProjectTypes();
      $scope.targetGeos = SystemData.getTargetGeos();
      $scope.supportTypes = SystemData.getSupportTypes();
      $scope.transportationModels = SystemData.getTransportationModels();
      $scope.distributions = distributions;
      $scope.project=project;
      ProjectOnlyDetail.get({id: $stateParams.projectId}, function (result) {
        $scope.project.details = result.details;
      });
      //todo: 交互信息可能发生变化,重读交互信息
      // before entering into detail page, should the project interact info
      $scope.commentsTabActive=false;
      $scope.applicationsTabActive=false;
      $scope.select = function (step) {
        $scope.commentsTabActive=false;
        $scope.applicationsTabActive=false;
        switch (step){
          case 'comments':
            $scope.commentsTabActive=true;
                break;
          case 'applications':
            $scope.applicationsTabActive=true;
            break;
        }
        $scope.$broadcast('project', step);
      };
    }]);
