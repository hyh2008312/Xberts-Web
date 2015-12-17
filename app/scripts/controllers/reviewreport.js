'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ReviewreportCtrl
 * @description
 * # ReviewreportCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ReviewreportCtrl', ['$scope', '$state', 'growl', 'UploadMultiForm', 'TempImage', 'ReviewReport', 'applicant',
    function ($scope, $state, growl, UploadMultiForm, TempImage, ReviewReport, applicant) {
      // model
      $scope.applicant = applicant;
      $scope.report = {};
      $scope.$emit('backdropOn', 'report get');
      ReviewReport.get({applicant_id: $scope.applicant}, function (data) {
        $scope.$emit('backdropOff', 'report get completed');
        if (data.count !== undefined && data.count > 0) {
          $scope.report = data.results[0];
          $scope.reportTemp.tempId = $scope.report.temp || 0;
        }
      });
      $scope.report.applicant = $scope.applicant.id;
      $scope.referenceId = 'reportapplicant_' + $scope.applicant.id;
      console.log($scope.referenceId);
      $scope.reportTemp = {
        tempId: $scope.report.temp || 0
      };

      //submit
      $scope.reportFormSubmit = function () {

        if ($scope.reportForm.$valid) {
          $scope.report.temp_id = $scope.reportTemp.tempId;
          $scope.$emit('backdropOn', 'post');
          $scope.report=new ReviewReport($scope.report);
          console.log($scope.report);
          //if (!$scope.report.id) {
          //  newReport.$save(function (resp) {
          //    $scope.$emit('backdropOff', 'success');
          //    growl.success('Success.');
          //    $state.go('application.main');
          //  }, function (resp) {
          //    $scope.$emit('backdropOff', 'error');
          //    growl.error('Sorry,some error happened.', {referenceId: $scope.referenceId});
          //    console.log(resp)
          //  });
          //} else {
          //  $scope.report.$put(function (resp) {
          //    $scope.$emit('backdropOff', 'success');
          //    growl.success('Success.');
          //    $state.go('application.main');
          //  }, function (resp) {
          //    $scope.$emit('backdropOff', 'error');
          //    growl.error('Sorry,some error happened.', {referenceId: $scope.referenceId});
          //    //growl.error('Sorry,some error happened.');
          //    console.log(resp)
          //  });
          //}
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
