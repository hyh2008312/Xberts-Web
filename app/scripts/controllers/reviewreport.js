'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ReviewreportCtrl
 * @description
 * # ReviewreportCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewreportCtrl', ['$scope', '$state', 'growl', 'UploadMultiForm', 'TempImage', 'applicant', 'report',
    function ($scope, $state, growl, UploadMultiForm, TempImage, applicant, report) {
      // model
      $scope.applicant = applicant;
      $scope.report = report;
      $scope.report.applicant = $scope.applicant.id;
      $scope.referenceId='applicant_'+ $scope.applicant.id;

      console.log(report);
      console.log(applicant);
      $scope.reportTemp = {
        tempId: $scope.report.temp || 0
      };

      //submit
      $scope.reportFormSubmit = function () {

        if ($scope.reportForm.$valid) {
          $scope.$emit('backdropOn', 'post');
          $scope.report.$save(function (resp) {
            $scope.$emit('backdropOff', 'success');
            $state.go('application.main');
          }, function (resp) {
            $scope.$emit('backdropOff', 'error');
            growl.error('Sorry,some error happened.',{referenceId:$scope.referenceId});
            console.log(resp)
          });
          return false;

        } else {
          $scope.reportForm.submitted = true;
          $scope.reportForm.$invalid = true;
        }
      };

      //summerNote Image Upload

      $scope.imageUpload = function (files) {
        var editor = $.summernote.eventHandler.getModule();
        for (var i = 0; i < files.length; i++) {
          var data = {
            image: files[i],
            type: 'report'
          };
          var uploadMultiImages = UploadMultiForm(
            '/upload/rest/temps/' + $scope.reportTemp.tempId + '/images/',
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
              editor.insertNode($scope.editable, img[0]);
            }, function (resp) {
              growl.error('Sorry,some error happened.');
              console.log(resp);
              $scope.$emit('backdropOff', 'error');
            });
          $scope.$emit('backdropOn', 'post');
          uploadMultiImages.upload();
        }
      };
    }]);
