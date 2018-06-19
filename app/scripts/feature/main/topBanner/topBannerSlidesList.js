angular.module('xbertsApp')
  .directive('topBannerSlidesList', ["$rootScope",function($rootScope) {
    return {
      restrict: 'E',
      scope: {
        slides: '=',
        ratio: '=',
        height: '='
      },
      templateUrl: 'scripts/feature/main/topBanner/top-banner-slides-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.active = 0;
      }
    }
  }]);
