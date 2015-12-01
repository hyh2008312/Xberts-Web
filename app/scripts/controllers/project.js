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
      // before entering into detail page, should the project interact info
      $scope.feedbacks = Interact.Feedback({interact_id: $scope.project.interact.id});
      $scope.feedbacks.get(function(results){
        console.log(results);
      });
      //$scope.join=Interact.Join({interact_id: $scope.project.interact.id,joiner_id:$rootScope.user.getUserId()});
      //$scope.join.get(function(results){
      //  $scope.joiner=results[0];
      //  console.log($scope.joiner);
      //});
      $scope.joins=Interact.Join({interact_id: $scope.project.interact.id,vote:true});
      $scope.joins.get(function(results){
        console.log(results);
      });

      $scope.tabs = [
        {active: true, disable: false},
        {active: false, disable: false},
        {active: false, disable: false},
        {active: false, disable: false}
      ];
      $scope.select = function (step) {
        console.log(step);
        $scope.$broadcast('projectBroadcast', step);
      };
    }]);
