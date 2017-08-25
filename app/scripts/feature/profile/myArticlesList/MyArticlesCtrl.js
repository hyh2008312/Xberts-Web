'use strict';

angular.module('xbertsApp')
  .controller('MyArticlesCtrl', ['$scope', '$rootScope','expert','Paginator','MainModel','ExpertService','$stateParams',
    function ($scope, $rootScope,expert,Paginator,MainModel,ExpertService, $stateParams) {
      $rootScope.pageSettings.setBackgroundColor('background-bg-light');
      $scope.expert = expert;
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.userId;

      var par = {
        name: 'articles_lists_' + $scope.expert.userId,
        objClass: MainModel,
        params: {
          owner__id : $scope.expert.userId,
          page_size: 12
        },
        fetchFunction: ExpertService.getArticles
      };
      $scope.postsArticlesPaginator = new Paginator(par);

    }]);
