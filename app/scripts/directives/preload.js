'use strict';

angular.module('xbertsApp')
  .directive('preload',function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        if(!element.hasClass('pre-loading')){
          element.addClass('pre-loading');
        }
        element.bind('load',function(){
          if($(this).hasClass('pre-loading')){
            $(this).removeClass('pre-loading');
          }
        });
        element.bind('error',function(){
          if($(this).hasClass('pre-loading')){
            $(this).removeClass('pre-loading');
          }
        });
      }
    };
  });
