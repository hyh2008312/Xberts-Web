angular.module('xbertsApp')
  .directive('searchBlogList', [function () {
    return {
      restrict: 'E',
      scope: {
        reviews: '=',
        isAll: '='
      },
      templateUrl: 'scripts/feature/search/searchBlogList/search-blog-list.html',
      link: function (scope, element, attrs, ctrls) {

      }
    }
  }]);
