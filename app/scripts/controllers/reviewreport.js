'use strict';

angular.module('xbertsApp')
  .controller('ReviewreportCtrl', ['$rootScope','$timeout', '$scope', '$state', 'growl', 'Configuration', 'UploadService', 'ReviewReport', 'applicant',
    function ($rootScope,$timeout, $scope, $state, growl, Configuration, UploadService, ReviewReport, applicant) {
      $rootScope.pageSettings.setBackgroundColor('background-whitem');
      var referenceId = 'reportapplicant_' + applicant.id;
      $scope.applicant = applicant;
      $scope.reportData = {
        applicant: applicant.id
      };
      // try to fetch the previous data of the applicant for this survey
      $scope.$emit('backdropOn', 'report get');
      ReviewReport.get({applicant_id: $scope.applicant.id}, function (data) {
        $scope.$emit('backdropOff', 'report get completed');
        if (data.count !== undefined && data.count > 0) {
          $scope.reportData = data.results[0];
        }
      });
      //submit
      $scope.reportFormSubmit = function () {
        $scope.cost_performance_error = function () {
          return $scope.reportData.cost_performance < 1;
        };
        $scope.usability_error = function () {
          return $scope.reportData.usability < 1;
        };
        $scope.presentation_error = function () {
          return $scope.reportData.presentation < 1;
        };

        if ($scope.reportForm.$valid && !$scope.cost_performance_error() && !$scope.usability_error() && !$scope.presentation_error() && $scope.detailCharacterCount > 1999) {
          $scope.$emit('backdropOn', 'post');
          var report = new ReviewReport($scope.reportData);
          if (!report.id) {
            report.$save(function (resp) {
              $scope.reportData = resp;
              $scope.$emit('backdropOff', 'success');
              growl.success('Your review has been submitted successfully!', {referenceId: referenceId});
              $timeout(function(){
                $state.go('application.main');
              },3);
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.', {referenceId: referenceId});
            });
          } else {
            report.$put(function (resp) {
              $scope.reportData = resp;
              $scope.$emit('backdropOff', 'success');
              growl.success('Your review has been submitted successfully!', {referenceId: referenceId});
              $timeout(function(){
                $state.go('application.main');
              },3);
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.', {referenceId: referenceId});
            });
          }
          return false;
        } else {
          $scope.reportForm.submitted = true;
          $scope.reportForm.$invalid = true;
        }
      };
      // summerNote character amount check

      $scope.onChange = function (contents) {
        $scope.detailCharacterCount = contents.replace(/(?:<([^>]+)>)/ig, "").replace(/(?:&[^;]{2,6};)/ig, "").length;
      };

      //summerNote Image Upload

      var videoSuccessCallback = function (data) {
        var videoNode = $scope.editor.summernote('videoDialog.createVideoNode', data.videoUrl);
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
    }])
  .controller('ReviewReportVisualCtrl', function ($scope, $rootScope, report) {
    $rootScope.pageSettings.setBackgroundColor('background-whitem');
    $scope.report = report;
  });
