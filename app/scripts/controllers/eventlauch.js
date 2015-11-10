'use strict';

/**
 * @ngdoc function
 * @name yeodjangoApp.controller:EventlauchCtrl
 * @description
 * # EventlauchCtrl
 * Controller of the yeodjangoApp
 */
angular.module('yeodjangoApp')
  .controller('EventLauchCtrl', ['$scope', '$state', 'UploadMultiForm', 'TempImage', function ($scope, $state, UploadMultiForm, TempImage) {
    // model
    $scope.eventTemp = {
      tags: [],
      tempId: 0
    };

    //for datePicker
    $scope.minDate = $scope.minDate ? null : new Date();
    $scope.datePickerStatus = false;
    $scope.open = function () {
      $scope.datePickerStatus = true;
    };

    //submit
    $scope.eventFormSubmit = function () {
      if ($scope.eventForm.$valid) {
        $scope.$emit('backdropOn', 'post');
        //event pre process
        var tags = [];
        for (var i = 0; i < $scope.eventTemp.tags.length; i++) {
          tags.push($scope.eventTemp.tags[i].text);
        }
        $scope.event.tags = tags.join(',');

        $scope.event.temp_id=$scope.eventTemp.tempId;
        //upload multiform-data
        $scope.uploadMulti = UploadMultiForm('/resources/events/','POST', $scope.event, function (resp) {
          $scope.$emit('backdropOff', 'success');
          $state.go('event', {eventId: resp.data.id});
        }, function (resp) {
          alert('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'error');
          console.log(resp)
        });
        $scope.uploadMulti.upload();

        return false;

      } else {
        $scope.eventForm.submitted = true;
      }
    };

    //summerNote Image Upload

    $scope.imageUpload = function (files) {
      var editor = $.summernote.eventHandler.getModule();
      for (var i = 0; i < files.length; i++) {
        var data = {
          image: files[i],
          type:'event'
        };
        var uploadMultiImages = UploadMultiForm(
          '/upload/rest/temps/' + $scope.eventTemp.tempId + '/images/',
          data,
          function (resp) {
            $scope.eventTemp.tempId = resp.data.temp;
            $scope.$emit('backdropOff', 'success');
            var img = $('<img />');
            img.attr({
              'src': resp.data.image,
              'data-id': resp.data.id
            });
            img.bind('DOMNodeRemovedFromDocument', function () {
              var tempImageId = $(this).attr('data-id');
              var resource = TempImage($scope.eventTemp.tempId, tempImageId);
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
