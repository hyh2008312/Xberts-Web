angular.module('xbertsApp')
  .controller('AnswerPostCtrl', ['$rootScope','$scope','UploadService','AskService','$stateParams','$state',
    function ($rootScope,$scope,UploadService,AskService,$stateParams,$state) {

      $scope.questionId = $stateParams.questionId;
      $scope.disabled = false;
      $scope.formToggle = true;
      $scope.options = {
        height: 400,
        toolbar: [
          ['textsize', ['fontsize']],
          ['insert', ['link','video', 'picture']]
        ],
        icons: {
          'fontsize': 'fa fa-font',
          'link': 'fa fa-link',
          'picture': 'fa fa-picture-o',
          'video': 'fa fa-youtube-play'
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
        for (var i = 0; i < files.length; i++) {
          UploadService.uploadFile(files[i], 'ANSWER', scope)
            .then(function (data) {
              imageSuccessCallback(data.data);
            }, errorCallback);
        }
      };

      $scope.onChange = function (contents) {
        $scope.detailCharacterCount = contents.replace(/(?:<([^>]+)>)/ig, "").replace(/(?:&[^;]{2,6};)/ig, "").length;
      };

      $scope.submitForm = function(answer,answerForm){
        if(!$rootScope.user.authRequired()) {
          return;
        }
        if (!answerForm.$valid) {
          return;
        }

        if(!answer || !answer.description) {
          return;
        }

        if (answer.description) {
          answer.description = answer.description.replace(/pre-loading/ig, "");
          answer.description = answer.description.replace(/(<p><br><\/p>){3,}/ig, "<p><br></p>");
        }

        var _product = {
          question: $scope.questionId,
          description: answer.description
        };
        $scope.disabled = true;
        // post start
        $scope.$emit('backdropOn', 'fetch project');
        AskService.createAnswers(_product).then(function () {
          $scope.$emit('backdropOff', 'success');
          $state.go('application.answerQuestionDetail({questionId:questionId})');
          $scope.disabled = false;
        }, function () {
          // tips
          $scope.$emit('backdropOff', 'project get error');
          // post end
        });
      };

      var title = 'Ask - Ask Xperts Community & Make Smart Purchasing Decision';
      var description = 'Get product recommendations from our global community of savvy-shopper';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);

