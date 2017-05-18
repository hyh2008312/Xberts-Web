angular.module('xbertsApp')
  .directive('answerPost',['$rootScope','UploadService','AskService','growl',
    function ($rootScope,UploadService, AskService,growl) {
    return {
      restrict: 'E',
      scope: {
        questionId : '=',
        detailCtrl: '=',
        options:'=',
        editor:'='
      },
      templateUrl: 'scripts/feature/ask/answerPost/answer-post.html',
      link: function (scope, element, attrs, ctrls) {

        scope.paste = function (e) {
          var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');

          e.preventDefault();

          var paragraphs = bufferText.split('\n');
          for (var i = 0; i < paragraphs.length; i++) {
            var pNode = document.createElement('p');
            var textNode = document.createTextNode(paragraphs[i]);
            pNode.appendChild(textNode);
            element.find('.summernote').summernote('insertNode', pNode);
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
          element.find('.summernote').summernote('insertNode', div);

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

        scope.imageUpload = function (files) {
          for (var i = 0; i < files.length; i++) {
            UploadService.uploadFile(files[i], 'ANSWER', scope)
              .then(function (data) {
                imageSuccessCallback(data.data);
              }, errorCallback);
          }
        };


        scope.submitForm = function(answer,answerForm){
          if(!$rootScope.user.authRequired()) {
            return;
          }
          if (!answerForm.$valid) {
            return;
          }

          if(!answer || !answer.description) {
            growl.error('111');
            return;
          }

          var _product = {
            question: scope.questionId,
            description: answer.description,
            productLink: {
              url:answer.productLink
            },
            image:answer.image,
            videoUrl:answer.videoUrl
          };

          // post start
          scope.$emit('backdropOn', 'fetch project');
          AskService.createAnswers(_product).then(function (newProduct) {
            scope.$emit('backdropOff', 'success');
            scope.answer = {};
            scope.answer.description = null;
            scope.detailCtrl.addProduct(newProduct);
            var scrollTop = angular.element('.xb-body-view').scrollTop();
            angular.element('.xb-body-view').scrollTop(scrollTop + angular.element('.xb-question-detail__answer-title').offset().top - 20);
          }, function () {
            // tips
            scope.$emit('backdropOff', 'project get error');
            // post end
          });
        };
      }
    }
  }]);
