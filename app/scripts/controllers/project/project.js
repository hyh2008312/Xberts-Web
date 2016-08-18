'use strict';

angular.module('xbertsApp')
  .controller('ProjectCtrl', ['$scope', '$rootScope', '$location', '$stateParams', '$uibModal', 'growl', 'SystemData',
    'ProjectOnlyDetail', 'Paginator', 'project', 'Project', 'localStorageService',
    function ($scope, $rootScope, $location, $stateParams, $uibModal, growl, SystemData,
              ProjectOnlyDetail, Paginator, project, Project, localStorageService) {
      var title = project.title;
      var description = project.description;
      var backgroundColor = 'background-whitem';
      var shareImage = project.image;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);

      $scope.projectTypes = SystemData.getProjectTypes();
      $scope.targetGeos = SystemData.getTargetGeos();
      $scope.supportTypes = SystemData.getSupportTypes();
      $scope.transportationModels = SystemData.getTransportationModels();
      $scope.project = project;
      ProjectOnlyDetail.get({id: $stateParams.projectId}, function (result) {
        $scope.project.details = result.details;
        $scope.project.inquiry_amount = result.inquiry_amount;
      });

      $scope.approve = function (isApproved) {
        $scope.$emit('backdropOn', 'approve project');

        if (isApproved) {
          Project.approve.save({id: project.id},
            function () {
              project.approval_status = 'APPROVED';

              $scope.$emit('backdropOff', 'success');
              growl.success('Project is approved.');
              localStorageService.clearAll();
            },
            function () {
              $scope.$emit('backdropOff', 'error');
              growl.error('Oops! Something went wrong.');
            });
        } else {
          Project.approve.delete({id: project.id},
            function () {
              project.approval_status = 'DISAPPROVED';

              $scope.$emit('backdropOff', 'success');
              growl.success('Project is rejected.');
              localStorageService.clearAll();
            },
            function () {
              $scope.$emit('backdropOff', 'error');
              growl.error('Oops! Something went wrong.');
            });
        }
      };

      SystemData.getSaleChannelsPromise();
    }]);
