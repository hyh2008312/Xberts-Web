'use strict';

angular.module('xbertsApp')
  .directive('addLinkTarget',function () {
    return {
      restrict: 'A',
      replace: false,
      scope: {},
      link: function (scope, element, attrs, ctrls) {
        scope.$watch('whatever',function(newValue,oldValue, scope){
          element.find('a').attr('target','_blank');
        });
      }
    };
  });
