angular.module('xbertsApp')
  .directive('iframeLoaded', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs, ctrls) {
        element.find('iframe').on('load', function() {
          element.find('.xb-loading').remove();
        });
      }
    }
  });
