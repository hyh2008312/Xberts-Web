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
          Project.getById($scope.projectData.id).then(
            function (result) {
              $scope.$emit('backdropOff', 'project get completed');
              console.log(result);
              $scope.projectData = result;
              // $scope.projectTemp.tags = Utils.parseCommaStringForTagInput(result.certification_tags);
              $scope.projectTemp.project_category = result.categories[0].id;
              //console.log($scope.projectData)
            },
            function (error) {
              growl.error('Sorry,some error happened.');
              $scope.$emit('backdropOff', 'project get failed');
            }
          );
        } else {
          $scope.projectData = Project.create();
        }

        //submit
        $scope.projectFormSubmit = function () {
          //project pre process
          if ($scope.projectData.details) {
            $scope.projectData.details = $scope.projectData.details.replace(/pre-loading/ig, "");
          }
          // $scope.projectData.certification_tags = Utils.convertTagsInputToCommaString($scope.projectTemp.tags);
          $scope.projectData.categories = [{
            id: $scope.projectTemp.project_category
          }];
          if ($scope.projectForm.$valid) {
            $scope.projectForm.submitted = true;
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
  .controller('LaunchProjectDetailCtrl', ['$scope', 'growl', 'UploadService', '$timeout', '$uibModal', '$state',
    function ($scope, growl, UploadService, $timeout, $uibModal, $state) {
      $scope.projectForm.submitted = false;
      var getCurrentRange = function () {
        var sel;
        if (window.getSelection) {
          sel = window.getSelection();
          if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
          }
        } else if (document.selection && document.selection.createRange) {
          return document.selection.createRange();
        }
        return null;
      };

      var insertImage = function (src, id) {
        setCurrentRange($scope.previousRange);

        //src = src || 'http://img762.ph.126.net/LLzXH6ArV6ystmyvHmYy3g==/4884435270860289921.jpg';
        //id = id || 1;

        var img = document.createElement('img');
        img.setAttribute('data-image-id', id);
        img.setAttribute('src', src);
        var div = document.createElement('div');
        div.appendChild(img);
        $scope.editor.summernote('insertNode', div);

        img.setAttribute('class', 'pre-loading full-image');
        img.onload = function () {
          this.setAttribute('class', 'full-image');
        };
        img.onerror = function () {
          this.setAttribute('class', '');
        };


        $timeout(function () {
          $scope.editor.summernote('insertParagraph');
          div.setAttribute('contenteditable', false);
          $scope.setPreviousRange();
        }, 100);

      };

      var setCurrentRange = function (range) {
        var sel;
        if (range) {
          if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          } else if (document.selection && range.select) {
            //document.select is a legacy problem.
            range.select();
          }
        }
      };

      $scope.previousRange = null;

      $scope.setPreviousRange = function (evt) {
        $scope.previousRange = getCurrentRange();
      };
      $scope.onFocus = function (evt) {
        evt.target.addEventListener('mouseup', $scope.setPreviousRange);
      };

      var videoSuccessCallback = function (data) {
        var videoNode = $scope.editor.summernote('videoDialog.createVideoNode', data.videoUrl);
        videoNode.setAttribute('data-video-id', data.id);
        $scope.editor.summernote('insertNode', videoNode);

        $scope.projectData.video_assets = $scope.projectData.video_assets || [];
        $scope.projectData.video_assets.push(data.id);
      };

      var imageSuccessCallback = function (data) {

        insertImage(data.imageUrl, data.id);
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
        $scope.projectData.cover = data.data.id;
      };

      $scope.coverUpload = function ($file) {
        if ($file) {
          UploadService.uploadFile($file, 'PROJECT_COVER', $scope)
            .then(coverSuccessCallback, errorCallback);
        }
      };

      $scope.paste = function (e) {
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var paragraphs = bufferText.split('\n');
        for (var i = 0; i < paragraphs.length; i++) {
          var pNode = document.createElement('p');
          var textNode = document.createTextNode(paragraphs[i]);
          pNode.appendChild(textNode);
          $scope.editor.summernote('insertNode', pNode);
        }

      };

      $scope.transitionListen = true;

      $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        console.log('kk');

        if (!$scope.transitionListen || $scope.projectForm.submitted) return;


        event.preventDefault();
        $scope.$emit('backdropOff', 'transition prevented');

        $scope.toState = toState;

        $scope.open('md');

      });

      $scope.open = function (size) {

        var modalInstance = $uibModal.open({
          templateUrl: 'views/modal/leave-prompt.html',
          controller: 'LeavePromptController',
          size: size,
          resolve: {
            title: function () {
              return 'project';
            }
          }
        });
        modalInstance.result.then(function (result) {
          $scope.transitionListen = false;
          $state.go($scope.toState.name);
        }, function (value) {
          console.info('Modal closed: ' + value);
        });
      };


    }]);
