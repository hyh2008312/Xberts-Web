'use strict';

angular.module('xbertsApp')
  .controller('EventLauchCtrl', ['$scope', '$state', '$timeout', 'Configuration', 'growl', 'UploadMultiForm', 'event',
    'UploadService',
    function ($scope, $state, $timeout, Configuration, growl, UploadMultiForm, event, UploadService) {
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
