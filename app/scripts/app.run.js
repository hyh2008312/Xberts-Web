'use strict';

angular
  .module('xbertsApp')
  .run(['$rootScope', '$state', '$stateParams', '$window', 'localStorageService', 'PageService', 'SignupService', 'SocialShare', '$location',
    function ($rootScope, $state, $stateParams, $window, localStorageService, PageService, SignupService, SocialShare, $location) {
      $rootScope.state = $state;
      $rootScope.stateParams = $stateParams;
      $rootScope.unreadDirectMessageCount = 0;
      $rootScope.unreadNotificationMessageCount = 0;
      $rootScope.unreadMessageCount = 0;
      $rootScope.summerNoteSimple = {
        height: 200,
        toolbar: [
          ['style', ['bold', 'italic', 'strikethrough']],
          ['fontface', ['fontname']],
          ['alignment', ['ul', 'ol']],
          ['insert', ['link']]
        ]
      };
      $rootScope.pageSettings = PageService.pageSetting;
      $rootScope.summerNoteFull = {
        height: 700,
        shortcuts: false,
        toolbar: [
          ['headline', ['style']],
          ['style', ['bold', 'italic']],
          ['alignment', ['ul', 'ol']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen','undo', 'redo']]
        ],
        styleTags: ['h1','p'],
        icons: {
          'align': 'fa fa-align-left',
          'alignCenter': 'fa fa-align-center',
          'alignJustify': 'fa fa-align-justify',
          'alignLeft': 'fa fa-align-left',
          'alignRight': 'fa fa-align-right',
          'indent': 'fa fa-indent',
          'outdent': 'fa fa-outdent',
          'arrowsAlt': 'fa fa-arrows-alt',
          'bold': 'fa fa-bold',
          'caret': 'caret',
          'circle': 'fa fa-circle',
          'close': 'fa fa-close',
          'code': 'fa fa-code',
          'eraser': 'fa fa-eraser',
          'font': 'fa fa-font',
          'frame': 'fa fa-frame',
          'italic': 'fa fa-italic',
          'link': 'fa fa-link',
          'unlink': 'fa fa-chain-broken',
          'magic': 'fa fa-header',
          'menuCheck': 'fa fa-check',
          'minus': 'fa fa-minus',
          'orderedlist': 'fa fa-list-ol',
          'pencil': 'fa fa-pencil',
          'picture': 'fa fa-picture-o',
          'question': 'fa fa-question',
          'redo': 'fa fa-repeat',
          'square': 'fa fa-square',
          'strikethrough': 'fa fa-strikethrough',
          'subscript': 'fa fa-subscript',
          'superscript': 'fa fa-superscript',
          'table': 'fa fa-table',
          'textHeight': 'fa fa-text-height',
          'trash': 'fa fa-trash',
          'underline': 'fa fa-underline',
          'undo': 'fa fa-undo',
          'unorderedlist': 'fa fa-list-ul',
          'video': 'fa fa-youtube-play'
        },
        popover: {
          link: [
            ['link', ['linkDialogShow', 'unlink']]
          ],
          air: [
            ['color', ['color']],
            ['font', ['bold', 'underline', 'clear']],
            ['para', ['ul', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture']]
          ]
        }
      };
      SocialShare.createSocialShare($location.absUrl());

      localStorageService.clearAll();
      // Capture potential campaign/source query param
      SignupService.saveSourceParam();

      $rootScope.$on('$stateChangeStart', function() {
        angular.element(".xb-body-view").off('scroll');
      });

      $rootScope.$on('$viewContentLoading', function() {
        if(angular.element(".xb-body-view").length>0)
        {
          angular.element(".xb-body-view").scrollTop(0);
        }
      });

      // Load facebook SDK
      $window.fbAsyncInit = function() {
        FB.init({
          appId      : '1109067122496559',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.5'
        });
      };

      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }]);
