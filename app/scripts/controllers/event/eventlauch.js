'use strict';

angular.module('xbertsApp')
  .controller('EventLauchCtrl', ['$scope', '$state', '$timeout', 'Configuration', 'growl', 'UploadMultiForm', 'event',
    'UploadService', 'EventService',
    function ($scope, $state, $timeout, Configuration, growl, UploadMultiForm, event, UploadService, EventService) {
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
        cover: null,
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
        $scope.eventForm.coverRequired = !$scope.event.cover;
        $scope.eventForm.bannerRequired = !$scope.event.banner;
        $scope.eventForm.organizerLogoRequired = !$scope.event.organizer_logo;

        if ($scope.eventForm.$valid && !$scope.eventForm.coverRequired && !$scope.eventForm.organizerLogoRequired &&
            !$scope.eventForm.bannerRequired) {
          $scope.$emit('backdropOn', 'post');
          //event pre process
          var tags = [];
          for (var i = 0; i < $scope.eventTemp.tags.length; i++) {
            tags.push($scope.eventTemp.tags[i].text);
          }
          $scope.event.tags = tags.join(',');

          var successCallback = function (response) {
            $scope.$emit('backdropOff', 'success');
            $state.go('application.event', {eventId: response.id});
          };

          var errorCallback = function (response) {
            growl.error('Oops, something went wrong.');
            $scope.$emit('backdropOff', 'error');
          };

          if ($scope.event.id) {
            EventService.update($scope.event)
              .then(successCallback)
              .catch(errorCallback);
          } else {
            EventService.create($scope.event)
              .then(successCallback)
              .catch(errorCallback);
          }
        } else {
          $scope.eventForm.submitted = true;
          $scope.eventForm.$invalid = true;
        }
      };

      $scope.previousRange = null;

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

      $scope.setPreviousRange = function (evt) {
        $scope.previousRange = getCurrentRange();
      };

      $scope.onFocus = function (evt) {
        evt.target.addEventListener('mouseup', $scope.setPreviousRange);
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

      var imageSuccessCallback = function (data) {
        insertImage(data.imageUrl, data.id);
        $scope.event.image_assets = $scope.event.image_assets || [];
        $scope.event.image_assets.push(data.id);
      };

      var errorCallback = function (error) {
        // Don't display error when user cancels upload
        if (error.status === -1) {
          return;
        }

        growl.error('Failed to upload');
      };

      //summerNote Image Upload
      $scope.imageUpload = function (files) {
        for (var i = 0; i < files.length; i++) {
          UploadService.uploadFile(files[i], 'EVENT_DETAILS', $scope)
            .then(function (data) {
              imageSuccessCallback(data.data);
            }, errorCallback);
        }
      };

      $scope.coverUpload = function ($file) {
        if ($file) {
          UploadService.uploadFile($file, 'EVENT_COVER', $scope)
            .then(function (data) {
              $scope.event.cover = data.data.id;
            })
            .catch(errorCallback);
        }
      };

      $scope.bannerUpload = function ($file) {
        if ($file) {
          UploadService.uploadFile($file, 'EVENT_BANNER', $scope)
            .then(function (data) {
              $scope.event.banner = data.data.id;
            })
            .catch(errorCallback);
        }
      };

      $scope.organizerLogoUpload = function ($file) {
        if ($file) {
          UploadService.uploadFile($file, 'EVENT_ORGANIZER_LOGO', $scope)
            .then(function (data) {
              $scope.event.organizer_logo = data.data.id;
            })
            .catch(errorCallback);
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
    }]);
