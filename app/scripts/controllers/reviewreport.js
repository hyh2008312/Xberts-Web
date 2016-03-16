'use strict';

angular.module('xbertsApp')
  .controller('ReviewreportCtrl', ['$timeout', '$scope', '$state', 'growl', 'Configuration', 'UploadMultiForm', 'TempImage', 'ReviewReport', 'applicant',
    function ($timeout, $scope, $state, growl, Configuration, UploadMultiForm, TempImage, ReviewReport, applicant) {
      // model
      $scope.applicant = applicant;
      $scope.report = {};
      $scope.$emit('backdropOn', 'report get');
      ReviewReport.get({applicant_id: $scope.applicant.id}, function (data) {
        $scope.$emit('backdropOff', 'report get completed');
        if (data.count !== undefined && data.count > 0) {
          $scope.report = data.results[0];
          $scope.reportTemp.tempId = $scope.report.temp || 0;
        }
      });
      $scope.report.applicant = $scope.applicant.id;
      $scope.referenceId = 'reportapplicant_' + $scope.applicant.id;
      $scope.reportTemp = {
        tempId: $scope.report.temp || 0
      };

      //submit
      $scope.reportFormSubmit = function () {

        if ($scope.reportForm.$valid) {
          $scope.report.temp_id = $scope.reportTemp.tempId;
          $scope.$emit('backdropOn', 'post');
          $scope.report = new ReviewReport($scope.report);
          if (!$scope.report.id) {
            $scope.report.$save(function (resp) {
              $scope.$emit('backdropOff', 'success');
              growl.success('Your report has been successfully submitted.', {referenceId: $scope.referenceId});
              $timeout(function () {
                $state.go('application.main');
              }, 3000);
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.', {referenceId: $scope.referenceId});
            });
          } else {
            $scope.report.$put(function (resp) {
              $scope.$emit('backdropOff', 'success');
              growl.success('Your report has been successfully submitted.', {referenceId: $scope.referenceId});
              $timeout(function () {
                $state.go('application.main');
              }, 3000);
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.', {referenceId: $scope.referenceId});
              //growl.error('Sorry,some error happened.');
            });
          }
          return false;

        } else {
          $scope.reportForm.submitted = true;
          $scope.reportForm.$invalid = true;
        }

      };

      //summerNote Image Upload

      $scope.imageUpload = function (files) {
        for (var i = 0; i < files.length; i++) {
          var data = {
            image: files[i],
            type: 'report'
          };
          var uploadMultiImages = UploadMultiForm(
            Configuration.apiBaseUrl + '/upload/rest/temps/' + $scope.reportTemp.tempId + '/images/',
            'POST',
            data,
            function (resp) {
              $scope.reportTemp.tempId = resp.data.temp;
              $scope.$emit('backdropOff', 'success');
              var img = $('<img />');
              img.attr({
                'src': resp.data.image,
                'data-id': resp.data.id
              });
              img.bind('DOMNodeRemovedFromDocument', function () {
                var tempImageId = $(this).attr('data-id');
                var resource = TempImage($scope.reportTemp.tempId, tempImageId);
                resource.delete();
              });
              $scope.editor.summernote('insertNode', img[0]);
            }, function (resp) {
              growl.error('Sorry,some error happened.');
              console.log(resp);
              $scope.$emit('backdropOff', 'error');
            });
          $scope.$emit('backdropOn', 'post');
          uploadMultiImages.upload();
        }
      };
    }])
  .controller('ReviewReportVisualCtrl', function ($scope,$rootScope, report) {
    $rootScope.pageSettings.setBackgroundColor('background-whitem');
    $scope.report = report;
  });
