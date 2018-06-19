'use strict';

angular.module('xbertsApp')
  .service('FileUtil', ['S', function(S) {
    this.getContentType = function(file) {
      return file.type != '' ? file.type : 'binary/octet-stream';
    };

    this.isVideo = function(file) {
      var contentType = this.getContentType(file);
      if (S(contentType).startsWith('video/')) {
        return true;
      } else {
        return false;
      }
    };

    this.isImage = function(file) {
      var contentType = this.getContentType(file);
      if (S(contentType).startsWith('image/') || S(contentType).startsWith('binary/')) {
        return true;
      } else {
        return false;
      }
    };
  }]);
