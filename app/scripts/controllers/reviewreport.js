'use strict';

angular.module('xbertsApp')
  .controller('ReviewreportCtrl', ['$rootScope', '$timeout', '$scope', '$state', '$stateParams', 'growl', 'Configuration', 'UploadService', 'ReviewReport', 'applicant',
    function ($rootScope, $timeout, $scope, $state, $stateParams, growl, Configuration, UploadService, ReviewReport, applicant) {
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
      });
      //submit

      $scope.cost_performance_error = function () {
        return $scope.reportData.cost_performance < 1;
      };
      $scope.usability_error = function () {
        return $scope.reportData.usability < 1;
      };
      $scope.presentation_error = function () {
        return $scope.reportData.presentation < 1;
      };

      $scope.formCheck=function(){
        return $scope.reportForm.$valid && $scope.imageCount > 2 && !$scope.cost_performance_error() && !$scope.usability_error() && !$scope.presentation_error() && $scope.detailCharacterCount > 1999
      };
      $scope.reportFormSubmit = function () {

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
        $scope.$emit('backdropOn', 'post');
        var report = new ReviewReport($scope.reportData);
        report.report_status = 'DRAFT';
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
      };
      // summerNote character amount check

      $scope.onChange = function (contents) {
        $scope.detailCharacterCount = contents.replace(/(?:<([^>]+)>)/ig, "").replace(/(?:&[^;]{2,6};)/ig, "").length;
        var groups = contents.match(/<img /ig);
        $scope.imageCount = angular.isArray(groups) ? groups.length : 0 ;
      };


      //summerNote Image Upload

      var videoSuccessCallback = function (data) {
        var videoNode = $scope.editor.summernote('videoDialog.createVideoNode', data.videoUrl);
        videoNode.setAttribute('data-video-id', data.id);
        $scope.editor.summernote('insertNode', videoNode);
        $scope.reportData.video_assets = $scope.reportData.video_assets || [];
        $scope.reportData.video_assets.push(data.id);
      };


      var imageSuccessCallback = function (data) {
        $scope.editor.summernote('insertImage', data.imageUrl, function ($image) {
          $image.attr('data-image-id', data.id);
        });
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
    }
  ])
  .
  controller('ReviewReportVisualCtrl', function ($scope, $rootScope, report) {
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
  });
