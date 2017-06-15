'use strict';

angular.module('xbertsApp')
  .controller('MyPostsCtrl', ['$scope', '$rootScope','expert','Paginator','ShareProduct','ShareProductService','$stateParams',
    function ($scope, $rootScope,expert,Paginator,ShareProduct,ShareProductService, $stateParams) {
      $rootScope.pageSettings.setBackgroundColor('background-bg-light');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.userId;

      var par = {
        name: 'posts_posts_' + $stateParams.expertId,
        objClass: ShareProduct,
        params: {
          owner: $stateParams.expertId,
          page_size:12
        },
        fetchFunction: ShareProductService.getList
      };
      $scope.postsProductPaginator = new Paginator(par);

    }]);
