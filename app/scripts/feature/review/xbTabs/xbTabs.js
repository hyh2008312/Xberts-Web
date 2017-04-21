'use strict';

angular.module('xbertsApp')
  .directive('xbTabs', function () {
    return {
      restrict: 'A',
      scope:{
        xbScrollTo: '='
      },
      link: function (scope, element, attrs, ctrls) {
        element.bind('click',function() {
          element.addClass('active').siblings().removeClass('active');
          var scrollTop = angular.element('.xb-body-view').scrollTop();
          angular.element('.xb-body-view').scrollTop(scrollTop + angular.element('#' + scope.xbScrollTo).offset().top - 145);
        });
      }
    }
  });
