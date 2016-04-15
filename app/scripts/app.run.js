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
          ['textsize', ['fontsize']],
          ['alignment', ['ul', 'ol']],
          ['insert', ['link']]
        ]
      };
      $rootScope.pageSettings = PageService.pageSetting;
      $rootScope.summerNoteFull = {
        height: 300,
        shortcuts: false,
        toolbar: [
          ['edit', ['undo', 'redo']],
          ['headline', ['style']],
          ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
          ['fontface', ['fontname']],
          ['textsize', ['fontsize']],
          ['fontclr', ['color']],
          ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
          ['height', ['height']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'videoUpload', 'hr']],
          ['view', ['fullscreen', 'codeview']]
        ]
      };
      localStorageService.clearAll();
      // Capture potential campaign/source query param
      SignupService.saveSourceParam();
    }]);
