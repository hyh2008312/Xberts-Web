'use strict';

angular.module('xbertsApp')
  .controller('ProjectCtrl', ['$scope', '$rootScope', '$stateParams', 'growl', 'SystemData', 'project', 'Project', 'localStorageService',
    function ($scope, $rootScope, $stateParams, growl, SystemData, project, Project, localStorageService) {
      var title = project.title;
      var description = project.description;
      var backgroundColor = 'background-whitem';
      var shareImage = project.image;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage);

      $scope.projectTypes = SystemData.getProjectTypes();
      $scope.project = project;
      Project.getDetailById($stateParams.projectId).then(function (result) {
        $scope.project.details = result.details;
      });
      
      $scope.approve = function (isApproved) {
        $scope.$emit('backdropOn', 'approve project');

        Project.approveById(project.id, isApproved).then(
          function () {
            $scope.$emit('backdropOff', 'success');
            if (isApproved) {
              project.approval_status = 'APPROVED';
              growl.success('Project is approved.');
            } else {
              project.approval_status = 'DISAPPROVED';
              growl.success('Project is rejected.');
            }
            localStorageService.clearAll();
          },
          function () {
            $scope.$emit('backdropOff', 'error');
            growl.error('Oops! Something went wrong.');
          }
        );
      };
      SystemData.getSaleChannelsPromise();
    }]);
