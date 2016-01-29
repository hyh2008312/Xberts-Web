'use strict';

angular.module('xbertsApp')
  .controller('ProjectinfoCtrl', ['$scope', 'Configuration', 'UploadMultiForm', 'TempImage', 'SystemData', 'Project', 'growl',
    function ($scope, Configuration, UploadMultiForm, TempImage, SystemData, Project, growl) {
      $scope.projectTypes = SystemData.getProjectTypes();

      $scope.projectTemp = {
        tempId: 0,
        //status:
        logo: null
      };

      if ($scope.projectId !== null) {
        $scope.$emit('backdropOn', 'project get');
        Project.fetch.get({id: $scope.projectId}, function (result) {
          $scope.$emit('backdropOff', 'project get completed');
          $scope.project = result;

          // Wipe out promise from resource wrapper so form upload, which doesn't support inner promise, works correctly
          $scope.project.$promise = undefined;
          $scope.projectTemp.tempId = result.temp || 0;
        }, function (error) {
          growl.error('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'project get failed');
          //console.log(error);
        });
      }

      //submit
      $scope.projectFormSubmit = function () {
        //project pre process
        $scope.project.temp_id = $scope.projectTemp.tempId;
        if ($scope.projectTemp.logo) {
          $scope.project.logo = $scope.projectTemp.logo;
        }
        $scope.projectForm.logoRequired = ($scope.project.logo === null) || ($scope.project.logo === undefined);

        if ($scope.projectForm.$valid && !$scope.projectForm.logoRequired) {

          var url = Configuration.apiBaseUrl + '/projects/rest/projects/';
          var method = 'POST';
          if ($scope.project.id) {
            url = url + $scope.project.id + '/';
            method = 'PUT';
          }
          $scope.$emit('backdropOn', 'post');

          //upload multiform-data
          $scope.uploadMulti = UploadMultiForm(url, method, $scope.project, function (resp) {
            $scope.$emit('backdropOff', 'success');
            $scope.$emit('projectStep', '0');
            $scope.$emit('projectId', resp.data.id);
            $scope.project = resp.data;
          }, function (resp) {
            growl.error('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'error');
          });
          $scope.uploadMulti.upload();

          return false;

        } else {
          $scope.projectForm.submitted = true;
          $scope.projectForm.$invalid = true;
        }
      };

      //summerNote Image Upload

      $scope.imageUpload = function (files) {
        for (var i = 0; i < files.length; i++) {
          var data = {
            image: files[i],
            type: 'project'
          };
          var uploadMultiImages = UploadMultiForm(
            Configuration.apiBaseUrl + '/upload/rest/temps/' + $scope.projectTemp.tempId + '/images/',
            'POST',
            data,
            function (resp) {
              $scope.projectTemp.tempId = resp.data.temp;
              $scope.$emit('backdropOff', 'success');
              var img = $('<img />');
              img.attr({
                'src': resp.data.image,
                'data-temp-image': resp.data.id
              });
              img.bind('DOMNodeRemovedFromDocument', function () {
                var tempImageId = $(this).attr('data-id');
                var resource = TempImage($scope.projectTemp.tempId, tempImageId);
                resource.delete();
              });
              $scope.editor.summernote('insertNode', img[0]);
            }, function (resp) {
              growl.error('Sorry,some error happened.');
              //console.log(resp);
              $scope.$emit('backdropOff', 'error');
            });
          $scope.$emit('backdropOn', 'post');
          uploadMultiImages.upload();
        }
      };
    }]);
