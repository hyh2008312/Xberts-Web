'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ProjectinfoCtrl
 * @description
 * # ProjectinfoCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ProjectinfoCtrl', ['$scope', 'UploadMultiForm', 'TempImage', 'SystemData', 'Project',
    function ($scope, UploadMultiForm, TempImage, SystemData, Project) {
      $scope.projectTypes=SystemData.getProjectTypes();
      $scope.projectTemp = {
        tempId: 0,
        //status:
        logo: null
      };

      if ($scope.projectId !== null) {
        $scope.$emit('backdropOn', 'project get');
        var project = new Project({id: $scope.projectId});
        project.$get(function (result) {
          $scope.$emit('backdropOff', 'project get completed');
          $scope.project = result;
          $scope.projectTemp.tempId = result.temp || 0;
        }, function (error) {
          alert("some error happened");
          $scope.$emit('backdropOff', 'project get failed');
          console.log(error);
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
          var url = '/projects/rest/projects/';
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
            alert('Sorry,some error happened.');
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
        var editor = $.summernote.eventHandler.getModule();
        for (var i = 0; i < files.length; i++) {
          var data = {
            image: files[i],
            type: 'project'
          };
          var uploadMultiImages = UploadMultiForm(
            '/upload/rest/temps/' + $scope.projectTemp.tempId + '/images/',
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
              editor.insertNode($scope.editable, img[0]);
            }, function (resp) {
              alert('Sorry,some error happened.');
              console.log(resp);
              $scope.$emit('backdropOff', 'error');
            });
          $scope.$emit('backdropOn', 'post');
          uploadMultiImages.upload();
        }
      };
    }]);
