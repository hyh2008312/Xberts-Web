'use strict';

angular.module('xbertsApp')
  .controller('EventLauchCtrl', ['$scope', '$state', 'Configuration', 'growl', 'UploadMultiForm', 'TempImage', 'event',
    function ($scope, $state, Configuration, growl, UploadMultiForm, TempImage, event) {
      var tagsParse = function (tagstring) {
        var tags = [];
        if (tagstring === undefined || tagstring === null || tagstring === "") {
          return tags;
        } else {
          var tagsTemp = tagstring.split(',');
          for (var i = 0; i < tagsTemp.length; i++) {
            var tag = {};
            tag.text = tagsTemp[i];
            tags.push(tag);
          }
          return tags;
        }
      };
      // model
      $scope.event = event;
      $scope.event.$promise = undefined;
      if ($scope.event.id) {
        $scope.event.when = new Date($scope.event.when);
      }
      $scope.eventTemp = {
        tags: tagsParse($scope.event.tags),
        tempId: $scope.event.temp || 0,
        logo: null,
        banner: null,
        organizer_logo: null
      };

      //for datePicker
      $scope.minDate = $scope.minDate ? null : new Date();
      $scope.datePickerStatus = false;
      $scope.open = function () {
        $scope.datePickerStatus = true;
      };

      //submit
      $scope.eventFormSubmit = function () {
        if ($scope.eventTemp.logo) {
          $scope.event.logo = $scope.eventTemp.logo;
        }
        $scope.eventForm.logoRequired = ($scope.event.logo === null) || ($scope.event.logo === undefined);

        if ($scope.eventTemp.banner) {
          $scope.event.banner = $scope.eventTemp.banner;
        }
        $scope.eventForm.bannerRequired = ($scope.event.banner === null) || ($scope.event.banner === undefined);

        if ($scope.eventTemp.organizer_logo) {
          $scope.event.organizer_logo = $scope.eventTemp.organizer_logo;
        }
        $scope.eventForm.organizerLogoRequired = ($scope.event.organizer_logo === null) || ($scope.event.organizer_logo === undefined);


        if ($scope.eventForm.$valid && !$scope.eventForm.logoRequired && !$scope.eventForm.organizerLogoRequired && !$scope.eventForm.bannerRequired) {
          $scope.$emit('backdropOn', 'post');
          //event pre process
          var tags = [];
          for (var i = 0; i < $scope.eventTemp.tags.length; i++) {
            tags.push($scope.eventTemp.tags[i].text);
          }
          $scope.event.tags = tags.join(',');
          $scope.event.temp_id = $scope.eventTemp.tempId;

          var method = 'POST';
          var url = Configuration.apiBaseUrl + '/resources/events/';
          if ($scope.event.id) {
            url = url + $scope.event.id + '/';
            method = 'PUT';
          }

          //upload multiform-data
          //console.log($scope.event);
          $scope.uploadMulti = UploadMultiForm(url, method, $scope.event, function (resp) {
            $scope.$emit('backdropOff', 'success');
            $state.go('application.event', {eventId: resp.data.id});
          }, function (resp) {
            growl.error('Sorry,some error happened.');
            $scope.$emit('backdropOff', 'error');
            //console.log(resp)
          });
          $scope.uploadMulti.upload();

          return false;

        } else {
          $scope.eventForm.submitted = true;
          $scope.eventForm.$invalid = true;
        }
      };

      //summerNote Image Upload

      $scope.imageUpload = function (files) {
        for (var i = 0; i < files.length; i++) {
          var data = {
            image: files[i],
            type: 'event'
          };
          var uploadMultiImages = UploadMultiForm(
            Configuration.apiBaseUrl + '/upload/rest/temps/' + $scope.eventTemp.tempId + '/images/',
            'POST',
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
              $scope.editor.summernote('insertNode', img[0]);
            }, function (resp) {
              growl.error('Sorry,some error happened.');
              //console.log(resp);
              $scope.$emit('backdropOff', 'error');
            });
          $scope.$emit('backdropOn', 'post');
          uploadMultiImages.upload();
        }
      };
    }]);
