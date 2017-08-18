angular.module('xbertsApp')
  .controller('AnswerPostCtrl', ['$rootScope','$scope','UploadService','AskService','$stateParams','$state',
    'localStorageService','growl','$filter','$timeout','$mdMedia',
    function ($rootScope,$scope,UploadService,AskService,$stateParams,$state,localStorageService,growl,$filter,$timeout,$mdMedia) {


      $scope.detailCharacterCount = 0;
      $scope.questionId = $stateParams.questionId;
      $scope.disabled = false;
      $scope.formToggle = true;

      var _height = !$mdMedia('xs') ? 400:300;

      $scope.options = {
        height: _height,
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

      $scope.setPreviousRange = function (evt) {
        $scope.previousRange = getCurrentRange();
      };

      $scope.onFocus = function (evt) {
        evt.target.addEventListener('mouseup', $scope.setPreviousRange);
      };

      $scope.paste = function (e) {
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');

        e.preventDefault();
        $scope.setPreviousRange();

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
        setCurrentRange($scope.previousRange);

        src = src || 'http://img762.ph.126.net/LLzXH6ArV6ystmyvHmYy3g==/4884435270860289921.jpg';
        id = id || 1;

        var img = document.createElement('img');
        img.setAttribute('data-image-id', id);
        img.setAttribute('src', src);
        img.setAttribute('url',url);
        var div = document.createElement('div');
        div.appendChild(img);
        div.setAttribute('class', 'xb-answer-img-bg');
        var p = document.createElement('p');
        p.appendChild(div);
        angular.element('.summernote').summernote('insertNode', p);

        img.setAttribute('class', 'pre-loading');
        img.onload = function () {
          this.setAttribute('class', '');
        };
        img.onerror = function () {
          this.setAttribute('class', '');
        };

        $timeout(function () {
          $scope.setPreviousRange();
        }, 100);

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

        var str =answer.description;
        str = str.replace(/[ | ]*\n/g,'\n');
        str = str.replace(/<\/?[^>]*>/g,'');
        str = str.replace(/&nbsp;/ig,'');
        str = str.replace(/\s+/g,"");

        if(str == '') {
          return;
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
          localStorageService.remove('ask_answers_list' + '_currentPage');
          localStorageService.remove('ask_answers_list' + '_items');
          localStorageService.remove('ask_answers_list' + '_next');
          localStorageService.remove('ask_answers_list' + '_count');
          $state.go('application.answerQuestionDetail',{questionId:$scope.questionId});
          $scope.disabled = false;
        }, function () {
          // tips
          $scope.$emit('backdropOff', 'project get error');
          // post end
        });
      };

      var title = 'Ask - Ask Xberts Community & Make Smart Purchasing Decision';
      var description = 'Get product recommendations from our global community of savvy-shopper';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);

