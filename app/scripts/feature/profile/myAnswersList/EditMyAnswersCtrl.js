'use strict';

angular.module('xbertsApp')
  .controller('EditMyAnswersCtrl', ['$rootScope','$scope','UploadService','AskService','$stateParams','$state',
    'localStorageService','growl','editMyAnswer','$filter','$mdMedia',
    function ($rootScope,$scope,UploadService,AskService,$stateParams,$state,localStorageService,growl,editMyAnswer,$filter,$mdMedia) {

      $scope.answer = editMyAnswer;
      var oldPost = angular.copy(editMyAnswer, {});
      var description = editMyAnswer.description;
      $scope.detailCharacterCount = description.replace("< *iframe(.|/r|/n)+?/iframe *>","")
        .replace(/(?:<([^>]+)>)/ig, "").replace(/(?:&[^;]{2,6};)/ig, "").length;;
      $scope.answerId = $stateParams.answerId;
      $scope.disabled = false;
      $scope.formToggle = true;
      $scope.options = {
        height: 400,
        toolbar: [
          ['textsize', ['fontsize']],
          ['style', ['bold']],
          ['insert', ['link','video', 'picture']]
        ],
        icons: {
          'bold': 'fa fa-bold',
          'caret': 'caret',
          'link': 'fa fa-link',
          'picture': 'fa fa-picture-o',
          'video': 'fa fa-youtube-play',
          'trash': 'fa fa-trash',
          'unlink': 'fa fa-chain-broken'
        },
        fontSizes: ['14', '18'],
        dialogsInBody: true,
        popover:{
          image:[['imagesize',
            ['remove',['removeMedia']]
          ]]
        }
      };

      $scope.reset = function() {
        $scope.answer = angular.copy(oldPost,{});
      };

      $scope.paste = function (e) {
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');

        e.preventDefault();

        var paragraphs = bufferText.split('\n');
        for (var i = 0; i < paragraphs.length; i++) {
          var pNode = document.createElement('p');
          var textNode = document.createTextNode(paragraphs[i]);
          if($filter('isLink')(paragraphs[i])) {
            var aNode = document.createElement('a');
            aNode.appendChild(textNode);
            aNode.setAttribute('href', paragraphs[i]);
            aNode.setAttribute('target', '_blank');
            pNode.appendChild(aNode);
          } else  {
            pNode.appendChild(textNode);
          }
          angular.element('.summernote').summernote('insertNode', pNode);
        }
      };

      var insertImage = function (src, id, url) {

        src = src || 'http://img762.ph.126.net/LLzXH6ArV6ystmyvHmYy3g==/4884435270860289921.jpg';
        id = id || 1;

        var img = document.createElement('img');
        img.setAttribute('data-image-id', id);
        img.setAttribute('src', src);
        img.setAttribute('url',url);
        var div = document.createElement('div');
        div.appendChild(img);
        div.setAttribute('class', 'xb-answer-img-bg');
        angular.element('.summernote').summernote('insertNode', div);

        img.setAttribute('class', 'pre-loading');
        img.onload = function () {
          this.setAttribute('class', '');
        };
        img.onerror = function () {
          this.setAttribute('class', '');
        };

      };

      var imageSuccessCallback = function (data) {
        insertImage(data.imageUrl, data.id, data.url);
      };

      var errorCallback = function (error) {
        // Don't display error when user cancels upload
        if (error.status === -1) {
          return;
        }

        growl.error('Failed to upload');
      };

      $scope.imageUpload = function (files) {
        if(!$rootScope.user.authRequired()) {
          return;
        }
        for (var i = 0; i < files.length; i++) {
          UploadService.uploadFile(files[i], 'ANSWER', $scope)
            .then(function (data) {
              imageSuccessCallback(data.data);
            }, errorCallback);
        }
      };

      $scope.onChange = function (contents) {
        $scope.detailCharacterCount = contents.replace("< *iframe(.|/r|/n)+?/iframe *>","")
          .replace(/(?:<([^>]+)>)/ig, "").replace(/(?:&[^;]{2,6};)/ig, "").length;
      };

      $scope.submitForm = function(answer,answerForm) {
        if(!$rootScope.user.authRequired()) {
          return;
        }
        if (!answerForm.$valid) {
          return;
        }

        if(!answer || !answer.description) {
          return;
        }

        if($scope.detailCharacterCount<150) {
          //return;
        }

        if (answer.description) {
          answer.description = answer.description.replace(/pre-loading/ig, "");
          answer.description = answer.description.replace(/(<p><br><\/p>){3,}/ig, "<p><br></p>");
        }

        var _product = {
          id: $scope.answerId,
          description: answer.description
        };
        $scope.disabled = true;
        // post start
        $scope.$emit('backdropOn', 'fetch project');
        AskService.updateAnswer(_product).then(function () {
          $scope.$emit('backdropOff', 'success');
          localStorageService.remove('ask_answers_list' + '_currentPage');
          localStorageService.remove('ask_answers_list' + '_items');
          localStorageService.remove('ask_answers_list' + '_next');
          localStorageService.remove('ask_answers_list' + '_count');

          if($stateParams.source == 'answer') {
            $state.go('application.answerQuestionDetail', {
              questionId: $stateParams.questionId
            },{
              reload:true
            });
          } else {
            if($mdMedia('xs')) {
              $state.go('application.protected.answers', {
                expertId: $rootScope.user.getUserId()
              },{
                reload:true
              });
            } else {
              $state.go('application.expert', {
                tab:'answers',
                expertId: $rootScope.user.getUserId()
              },{
                reload:true
              });
            }

          }
          $scope.disabled = false;
        }, function () {
          // tips
          $scope.$emit('backdropOff', 'project get error');
          // post end
        });
      };

      var title = '';
      var description = '';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);

