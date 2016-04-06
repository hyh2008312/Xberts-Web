'use strict';

angular.module('xbertsApp')
  .controller('LaunchprojectCtrl',
    ['$scope', '$rootScope', '$state', '$stateParams', 'Utils', 'localStorageService', 'growl', 'SystemData', 'UploadImageAsset', 'UploadAws', 'Project',
      function ($scope, $rootScope, $state, $stateParams, Utils, localStorageService, growl, SystemData, UploadImageAsset, UploadAws, Project) {

        $rootScope.pageSettings.setBackgroundColor('background-whitem');

        $scope.projectData = {images: []};
        $scope.projectTemp = {
          tags: []
        };
        $scope.projectData.id = $stateParams.projectId || null;
        $scope.projectTypes = SystemData.getProjectTypes();

        $scope.UiSref = function (state, index) {
          if (!$scope.tags[index].disabled) {
            $state.go(state);
            //$scope.tags[index].active = true;
          }
        };

        $scope.tags = [
          {active: true, disabled: false},
          {active: false, disabled: true}
        ];
        $scope.$watch('projectData', function () {
          $scope.tags[1].disabled = !$scope.projectData.id;
        });

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
  .controller('LaunchProjectBasicCtrl', ['$scope', 'growl', 'UploadAws', 'UploadImageAsset', function ($scope, growl, UploadAws, UploadImageAsset) {
    $scope.imageUpload = function (files) {
      $scope.$emit('backdropOn', 'post');
      for (var i = 0; i < files.length; i++) {
        UploadAws.uploadImage(files[i], 'IMAGE_PROJECT_DETAILS').then(function (response) {
          //UploadImageAsset
          var url = decodeURIComponent(response.headers('Location'));
          var asset = new UploadImageAsset({url: url, type: 'PROJECT_DETAILS'});
          asset.$save(function (data) {
            $scope.editor.summernote('insertImage', data.image_url);
            $scope.projectData.images = $scope.projectData.images || [];
            $scope.projectData.images.push(data.id);
            $scope.$emit('backdropOff', 'success');
          }, function () {
            growl.error('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'error');
          });
        }, function (data) {
          growl.error('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'error');
        }, function (evt) {
          var progress = parseInt(100.0 * evt.loaded / evt.total);
          console.log(progress);
        });
      }
    };
    $scope.coverUpload = function ($file) {
      console.log($file);
      if ($file) {
        $scope.$emit('backdropOn', 'post');
        UploadAws.uploadImage($file, 'IMAGE_PROJECT_COVER').then(function (response) {
          //UploadImageAsset
          var url = decodeURIComponent(response.headers('Location'));
          var asset = new UploadImageAsset({url: url, type: 'PROJECT_COVER'});
          asset.$save(function (data) {
            $scope.projectData.cover = data.id;
            $scope.$emit('backdropOff', 'success');
          }, function () {
            growl.error('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'error');
          });
        }, function (data) {
          growl.error('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'error');
        }, function (evt) {
          var progress = parseInt(100.0 * evt.loaded / evt.total);
          console.log(progress);
        });
      }
    }
  }]);
