'use strict';

angular.module('xbertsApp')
  .controller('MyPostsCtrl', ['$scope', '$rootScope','expert','Paginator','ProductDeals','ExpertService','$stateParams',
    function ($scope, $rootScope,expert,Paginator,ProductDeals,ExpertService, $stateParams) {

      $rootScope.pageSettings.setBackgroundColor('background-bg-white');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.userId;

      var par = {
        name: 'posts_posts_' + $stateParams.expertId,
        objClass: ProductDeals,
        params: {
          id: $stateParams.expertId,
          page_size:12
        },
        fetchFunction: ExpertService.getPostList
      };
      $scope.postsProductPaginator = new Paginator(par);

    }]);
