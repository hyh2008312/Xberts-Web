'use strict';

angular.module('xbertsApp')
  .controller('ReviewreportCtrl', ['$rootScope', '$timeout', '$scope', '$state', '$stateParams', 'growl', 'Configuration', 'UploadService', 'ReviewReport', 'applicant','$uibModal',
    function ($rootScope, $timeout, $scope, $state, $stateParams, growl, Configuration, UploadService, ReviewReport, applicant,$uibModal) {

      $scope.applicant = applicant;
      $rootScope.pageSettings.setBackgroundColor('background-whitem');
      $scope.referenceId = 'reportapplicant_' + applicant.id;
      $scope.reportData = {
        applicant_id: applicant.id
      };
      // try to fetch the previous data of the applicant for this survey
      $scope.$emit('backdropOn', 'report get');
      ReviewReport.get({reviewId: $stateParams.reviewId, applicant_id: applicant.id}, function (data) {
        $scope.$emit('backdropOff', 'report get completed');
        if (data.count !== undefined && data.count > 0) {
          $scope.reportData = data.results[0];
        }
        $scope.onChange($scope.reportData.details || "");
      });
      //submit

      $scope.cost_performance_error = function () {
        $scope.reportData.cost_performance = $scope.reportData.cost_performance || 0;
        return $scope.reportData.cost_performance < 1;
      };
      $scope.usability_error = function () {
        $scope.reportData.usability = $scope.reportData.usability || 0;
        return $scope.reportData.usability < 1;
      };
      $scope.presentation_error = function () {
        $scope.reportData.presentation = $scope.reportData.presentation || 0;
        return $scope.reportData.presentation < 1;
      };

      $scope.formCheck = function () {
        return $scope.reportForm.$valid && $scope.imageCount > 2 && !$scope.cost_performance_error() && !$scope.usability_error() && !$scope.presentation_error() && $scope.detailCharacterCount > 1999
      };
      $scope.reportFormSubmit = function () {
        $scope.reportForm.submitted = true;

        $scope.reportData.details = $scope.reportData.details.replace(/pre-loading/ig, "");

        if ($scope.formCheck()) {
          $scope.$emit('backdropOn', 'post');
          var report = new ReviewReport($scope.reportData);
          if (!report.id) {
            report.report_status = 'PUBLISHED';
            report.$save({reviewId: $stateParams.reviewId}, function (resp) {
              $scope.reportData = resp;
              $scope.$emit('backdropOff', 'success');
              growl.success('Your review has been submitted successfully!', {referenceId: $scope.referenceId});
              $timeout(function () {
                $state.go('application.report', {reviewId: $stateParams.reviewId, reportId: $scope.reportData.id});
              }, 3);
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.', {referenceId: $scope.referenceId});
            });
          } else {
            report.report_status = 'PUBLISHED';
            report.$put({reviewId: $stateParams.reviewId}, function (resp) {
              $scope.reportData = resp;
              $scope.$emit('backdropOff', 'success');
              growl.success('Your review has been submitted successfully!', {referenceId: $scope.referenceId});
              $timeout(function () {
                $state.go('application.report', {reviewId: $stateParams.reviewId, reportId: $scope.reportData.id});
              }, 3);
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.', {referenceId: $scope.referenceId});
            });
          }
          return false;
        } else {
          $scope.reportForm.submitted = true;
          $scope.reportForm.$invalid = true;
        }
      };

      $scope.reportSave = function () {
        $scope.reportData.details = $scope.reportData.details.replace(/pre-loading/ig, "");

        var report = new ReviewReport($scope.reportData);
        report.report_status = 'DRAFT';
        if ($scope.reportForm.$valid) {
          $scope.reportForm.submitted = true;
          $scope.$emit('backdropOn', 'post');
          if (!report.id) {
            report.$save({reviewId: $stateParams.reviewId}, function (resp) {
              $scope.reportData = resp;
              $scope.$emit('backdropOff', 'success');
              growl.success('Your review has been saved successfully!', {referenceId: $scope.referenceId});
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.', {referenceId: $scope.referenceId});
            });
          } else {
            report.$put({reviewId: $stateParams.reviewId}, function (resp) {
              $scope.reportData = resp;
              $scope.$emit('backdropOff', 'success');
              growl.success('Your review has been saved successfully!', {referenceId: $scope.referenceId});
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.', {referenceId: $scope.referenceId});
            });
          }
        } else {
          $scope.reportForm.submitted = true;
          $scope.reportForm.$invalid = true;
        }

      };
      // summerNote character amount check

      $scope.onChange = function (contents) {
        $scope.detailCharacterCount = contents.replace(/(?:<([^>]+)>)/ig, "").replace(/(?:&[^;]{2,6};)/ig, "").length;
        var groups = contents.match(/<img /ig);
        $scope.imageCount = angular.isArray(groups) ? groups.length : 0;
        $scope.reportForm.$pristine = true;
      };

      $scope.paste = function (e) {
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');

        e.preventDefault();
        $scope.setPreviousRange();

        var paragraphs = bufferText.split('\n');
        for (var i = 0; i < paragraphs.length; i++) {
          var pNode = document.createElement('p');
          var textNode = document.createTextNode(paragraphs[i]);
          pNode.appendChild(textNode);
          $scope.editor.summernote('insertNode', pNode);
        }
      };

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

      var insertImage = function (src, id) {
        setCurrentRange($scope.previousRange);

        src = src || 'http://img762.ph.126.net/LLzXH6ArV6ystmyvHmYy3g==/4884435270860289921.jpg';
        id = id || 1;

        var img = document.createElement('img');
        img.setAttribute('data-image-id', id);
        img.setAttribute('src', src);
        var div = document.createElement('div');
        div.appendChild(img);
        $scope.editor.summernote('insertNode', div);

        img.setAttribute('class', 'pre-loading');
        img.onload = function () {
          this.setAttribute('class', '');
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

      //$scope.insertImage=insertImage;


      $scope.previousRange = null;

      $scope.setPreviousRange = function (evt) {
        $scope.previousRange = getCurrentRange();
      };
      $scope.onFocus = function (evt) {
        evt.target.addEventListener('mouseup', $scope.setPreviousRange);
      };


      //summerNote Image Upload

      var videoSuccessCallback = function (data) {
        var videoNode = $scope.editor.summernote('videoDialog.createVideoNode', data.videoUrl);
        videoNode.setAttribute('data-video-id', data.id);
        setCurrentRange($scope.previousRange);
        $scope.editor.summernote('insertNode', videoNode);
        $scope.setPreviousRange();
        $scope.reportData.video_assets = $scope.reportData.video_assets || [];
        $scope.reportData.video_assets.push(data.id);
      };


      var imageSuccessCallback = function (data) {
        insertImage(data.imageUrl, data.id);
        $scope.reportData.image_assets = $scope.reportData.image_assets || [];
        $scope.reportData.image_assets.push(data.id);
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
          UploadService.uploadFile(files[i], 'REVIEW_REPORT_DETAILS', $scope)
            .then(function (data) {
              if (data.type === 'VIDEO') {
                videoSuccessCallback(data.data);
              } else {
                imageSuccessCallback(data.data)
              }
            }, errorCallback);
        }
      };

      $scope.transitionListen = true;

      $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        console.log($scope.transitionListen);
        console.log($scope.reportForm.$pristine);
        console.log($scope.reportForm.submitted);

        if (!$scope.transitionListen || $scope.reportForm.submitted) return;

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
              return 'report';
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



    }
  ])
  .
  controller('ReviewReportVisualCtrl', function ($scope, $rootScope, $stateParams, report, ReviewReport, growl) {
    $scope.report = report;

    var title = report.title;
    var description = report.description;
    var backgroundColor = 'background-whitem';
    $rootScope.pageSettings.setPage(title, description, backgroundColor);
    $scope.tabs = [
      {title: 'detail', active: true},
      {title: 'comments', active: false}
    ];

    $scope.commentsTabActive = false;
    $scope.select = function (step) {
      $scope.commentsTabActive = false;
      switch (step) {
        case 'comments':
          $scope.commentsTabActive = true;
          break;
      }
    };
    $scope.approve = function () {
      $scope.$emit('backdropOn', 'approve project');
      ReviewReport.patch({id: report.id, reviewId: $stateParams.reviewId}, {is_approved: 'PENDING'}, function () {
        $scope.$emit('backdropOff', 'success');
        growl.success('review  report is approved.');
      })
    };
  });
