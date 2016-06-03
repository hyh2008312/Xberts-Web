'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:preload
 * @description
 * # backdrop
 */
angular.module('xbertsApp')
  .directive('preload',function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        console.log('preload');
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
