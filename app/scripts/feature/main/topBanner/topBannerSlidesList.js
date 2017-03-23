angular.module('xbertsApp')
  .directive('topBannerSlidesList', ["$rootScope",function($rootScope) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'scripts/feature/main/topBanner/top-banner-slides-list.html',
      link: function (scope, element, attrs, ctrls) {
        scope.active = 0;
        scope.slides = [];
        for(var i = 0; i < 1; i++) {
          scope.slides.push({
            id: i,
            image: 'https://xberts.imgix.net/static/banner/Homepage-banner.jpg?s=497b440c4e63599bf76be61daba40875',
            smallImage: 'https://xberts.imgix.net/static/banner/M-homepage-banner.jpg?s=34da26c24aaae32b74b43cac8fd71fab',
            title: 'Discover Perfect and Money-Saving Products <br/>Through Our Expert Community',
            subtitle: 'We bring you the best products that have been tested by trusted experts',
            buttonShow: !$rootScope.user.isAuth(),
            buttonText: 'Sign Up Now',
            buttonColor: 'btn-primary',
            url: 'application.signup',
            params: {}
          });
        }
      }
    }
  }]);
