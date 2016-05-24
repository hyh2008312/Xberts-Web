'use strict';

angular
  .module('xbertsApp')
  .run(['$rootScope', '$state', '$stateParams', 'localStorageService', 'PageService', 'SignupService',
    function ($rootScope, $state, $stateParams, localStorageService, PageService, SignupService) {
      $rootScope.state = $state;
      $rootScope.stateParams = $stateParams;
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
        height: 300,
        shortcuts: false,
        toolbar: [
          ['headline', ['style']],
          ['style', ['bold', 'italic']],
          ['alignment', ['ul', 'ol']],
          ['insert', ['link', 'picture', 'videoUpload']],
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
          image: [
            ['remove', ['removeMedia']]
          ],
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
      localStorageService.clearAll();
      // Capture potential campaign/source query param
      SignupService.saveSourceParam();
    }]);
