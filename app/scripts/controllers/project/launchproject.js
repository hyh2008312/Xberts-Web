'use strict';

angular.module('xbertsApp')
  .controller('LaunchprojectCtrl',
    ['$scope', '$rootScope', '$state', '$stateParams', 'Utils', 'localStorageService', 'growl', 'SystemData',
      'Project',
      function ($scope, $rootScope, $state, $stateParams, Utils, localStorageService, growl, SystemData,
                Project) {

        $rootScope.pageSettings.setBackgroundColor('background-whitem');

        $scope.projectData = {image_assets: []};
        $scope.projectTemp = {
          tags: []
        };
        $scope.projectData.id = $stateParams.projectId || null;
        $scope.projectTypes = SystemData.getProjectTypes();

        $scope.tags = [
          {active: true, disabled: false},
          {active: false, disabled: true}
        ];
        $scope.isUploading = false;
        $scope.uploadProgress = 0;

        $scope.$watch('projectData', function () {
          $scope.tags[1].disabled = !$scope.projectData.id;
        });

        $scope.UiSref = function (state, index) {
          if (!$scope.tags[index].disabled) {
            $state.go(state);
            //$scope.tags[index].active = true;
          }
        };

        if ($scope.projectData.id !== null) {
          $scope.$emit('backdropOn', 'fetch project');
          Project.fetch.get({id: $scope.projectData.id}, function (result) {
            $scope.$emit('backdropOff', 'project get completed');
            $scope.projectData = result;
            $scope.projectTemp.tags = Utils.parseCommaStringForTagInput(result.certification_tags);
            //console.log($scope.projectData)
          }, function (error) {
            growl.error('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'project get failed');
          });
        } else {
          $scope.projectData = new Project.fetch();
        }

        //submit
        $scope.projectFormSubmit = function () {
          //project pre process
          $scope.projectData.certification_tags = Utils.convertTagsInputToCommaString($scope.projectTemp.tags);
          if ($scope.projectForm.$valid) {
            if ($scope.projectData.id) {
              $scope.projectData.$patch(function (data) {
                $scope.$emit('backdropOff', 'success');
                if ($state.is('^.basic')) {
                  $state.go('^.detail');
                } else {
                  $state.go('application.project', {projectId: $scope.projectData.id})
                }
              }, function () {
                growl.error('Sorry,some error happened.');
                $scope.$emit('backdropOff', 'error');
              })
            } else {
              $scope.projectData.$save(function (data) {
                console.log(data);
                $scope.$emit('backdropOff', 'success');
                if ($state.is('^.basic')) {
                  $scope.tags[1].disabled = false;
                  $state.go('application.protected.projectEdit.detail', {projectId: $scope.projectData.id});
                } else {
                  $state.go('application.project', {projectId: $scope.projectData.id})
                }
              }, function () {
                growl.error('Sorry,some error happened.');
                $scope.$emit('backdropOff', 'error');
              })
            }
            $scope.$emit('backdropOn', 'post');
            return false;

          } else {
            $scope.projectForm.submitted = true;
            $scope.projectForm.$invalid = true;
          }
        };
        localStorageService.clearAll();
      }])
  .controller('LaunchProjectDetailCtrl', ['$scope', 'growl', 'UploadService',
    function ($scope, growl, UploadService) {
      var videoSuccessCallback = function (data) {
        var videoNode = $scope.editor.summernote('videoDialog.createVideoNode', data.videoUrl);
        $scope.editor.summernote('insertNode', videoNode);

        $scope.projectData.video_assets = $scope.projectData.video_assets || [];
        $scope.projectData.video_assets.push(data.id);
      };

      var imageSuccessCallback = function (data) {
        $scope.editor.summernote('insertImage', data.imageUrl,function ($image) {
          $image.attr('data-image-id', data.id);
        });
        $scope.projectData.image_assets = $scope.projectData.image_assets || [];
        $scope.projectData.image_assets.push(data.id);
      };

      var errorCallback = function (error) {
        // Don't display error when user cancels upload
        if (error.status === -1) {
          return;
        }

        growl.error('Failed to upload');
      };

      $scope.imageUpload = function (files) {
        for (var i = 0; i < files.length; i++) {
          UploadService.uploadFile(files[i], 'PROJECT_DETAILS', $scope)
            .then(function (data) {
              if (data.type === 'VIDEO') {
                videoSuccessCallback(data.data);
              } else {
                imageSuccessCallback(data.data)
              }
            }, errorCallback);
        }
      };

      var coverSuccessCallback = function (data) {
        $scope.projectData.cover = data.id;
      };

      $scope.coverUpload = function ($file) {
        if ($file) {
          UploadService.uploadFile($file, 'PROJECT_COVER', $scope)
            .then(coverSuccessCallback, errorCallback);
        }
      };
    }]);
