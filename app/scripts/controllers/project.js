'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ProjectCtrl', ['$scope', '$rootScope', '$location', '$stateParams', '$uibModal', 'SystemData', 'Interact', 'ProjectOnlyDetail', 'Distributor', 'Paginator', 'project', 'distributions',
    function ($scope, $rootScope, $location, $stateParams, $uibModal, SystemData, Interact, ProjectOnlyDetail, Distributor, Paginator, project, distributions) {
      $rootScope.bodyBackground = 'background-whitem';

      $scope.projectTypes = SystemData.getProjectTypes();
      $scope.targetGeos = SystemData.getTargetGeos();
      $scope.supportTypes = SystemData.getSupportTypes();
      $scope.transportationModels = SystemData.getTransportationModels();
      $scope.distributions = distributions;
      $scope.project = project;
      ProjectOnlyDetail.get({id: $stateParams.projectId}, function (result) {
        $scope.project.details = result.details;
      });
      //todo: 交互信息可能发生变化,重读交互信息
      // before entering into detail page, should the project interact info

      $scope.tabs = [
        {title: 'detail', active: true},
        {title: 'comments', active: false},
        {title: 'application', active: false}
      ];

      $scope.commentsTabActive = false;
      $scope.applicationsTabActive = false;
      $scope.select = function (step) {
        $scope.commentsTabActive = false;
        $scope.applicationsTabActive = false;
        switch (step) {
          case 'comments':
            $scope.commentsTabActive = true;
            break;
          case 'applications':
            $scope.applicationsTabActive = true;
            $scope.followersTabActive = true;
            var fetchFunction1 = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, request__project_id: $scope.project.id};
              angular.extend(params, otherParams);
              Distributor.get(params, callback);
            };
            $scope.distributorsPaginator = Paginator('distributor_' + $scope.project.id, fetchFunction1);
            $scope.distributorsPaginator.clear();
            $scope.distributorsPaginator.loadNext();
            break;
        }
        $scope.$broadcast('project', step);
      };

      //modal

      $scope.open = function (size) {
        if (!$rootScope.user.authRequired()) {
          return
        }
        var modalInstance = $uibModal.open({
          templateUrl: '/views/applicationinfo.html',
          controller: 'DistributorCtrl',
          size: size,
          resolve: {
            distribution: function () {
              return $scope.distributions[0];
            },
            salesChannels: ['SystemData', function (SystemData) {
              return SystemData.getSaleChannels() === null ? SystemData.getSaleChannelsPromise() : SystemData.getSaleChannels();
            }]
          }
        });
      };
      var search = $location.search();
      var tab = search.tab || 'detail';
      if (search.tab) {
        for (var i = 0; i < $scope.tabs.length; i++) {
          $scope.tabs[i].active = $scope.tabs[i].title === search.tab;
        }
      }
      SystemData.getSaleChannelsPromise();
    }])
  .controller('ProjectNoRequestCtrl', ['$scope', '$rootScope', '$stateParams', 'SystemData', 'Interact', 'ProjectOnlyDetail', 'Paginator', 'project',
    function ($scope, $rootScope, $stateParams, SystemData, Interact, ProjectOnlyDetail, Paginator, project) {
      $rootScope.bodyBackground = 'background-whitem';

      $scope.projectTypes = SystemData.getProjectTypes();
      $scope.project = project;
      ProjectOnlyDetail.get({id: $stateParams.projectId}, function (result) {
        $scope.project.details = result.details;
      });
      //todo: 交互信息可能发生变化,重读交互信息
      // before entering into detail page, should the project interact info

      $scope.tabs = [
        {title: 'detail', active: true},
        {title: 'comments', active: false}
      ];

      $scope.commentsTabActive = false;
      $scope.applicationsTabActive = false;
      $scope.select = function (step) {
        $scope.commentsTabActive = false;
        $scope.applicationsTabActive = false;
        switch (step) {
          case 'comments':
            $scope.commentsTabActive = true;
            break;
        }
        $scope.$broadcast('project', step);
      };
    }]);
