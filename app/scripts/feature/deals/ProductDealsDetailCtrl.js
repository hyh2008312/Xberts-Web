'use strict';

angular.module('xbertsApp')
  .controller('ProductDealsDetailCtrl', ['$rootScope','$scope','productsDetail','productsPaginator', 'InviteService',
    'BrowserUtil','ExpertService','Paginator','ProductDeals','DealsService','$mdMedia','$state','DealsFactory',
    '$stateParams',
    function($rootScope,$scope,productsDetail,productsPaginator,InviteService,BrowserUtil,ExpertService,Paginator,
             ProductDeals,DealsService,$mdMedia,$state, DealsFactory,$stateParams) {

      $scope.$parent.isPopupOpen = !$stateParams.isPopupOpen;
      $scope.isPopupOpen = $stateParams.isPopupOpen;

      $scope.categoryItem = DealsFactory.categoryItem;

      $scope.productsDetail = DealsFactory.changeFolloweeList(productsDetail);
      $scope.productsPaginator = productsPaginator;
      $scope.headImage = DealsService.headImage;

      if(productsDetail.owner != null) {
        $scope.expert = {
          userId: productsDetail.owner.id
        };
        ExpertService.getAchievement(productsDetail.owner.id).then(function(data) {
           $scope.achievement = data;
        });

        var par = {
          name: 'other_posts_' + productsDetail.owner.id,
          objClass: ProductDeals,
          params: {
            id: productsDetail.owner.id,
            page_size:12
          },
          fetchFunction: ExpertService.getPostList
        };

        $scope.postsProductPaginator = new Paginator(par);
        $scope.postsProductPaginator.load();
      }

      $scope.seeMore = function() {
        if($mdMedia('xs')) {
          $state.go('application.protected.posts', {
            expertId: productsDetail.owner.id
          },{
            reload:true
          });
        } else {
          $state.go('application.expert', {
            tab:'deals',
            expertId: productsDetail.owner.id
          },{
            reload:true
          });
        }
      };

      $scope.inviteObj = angular.copy(InviteService, {});

      $scope.isFacebookApp = BrowserUtil.isFacebookApp();

      // FAB Speed Dial Component
      // Set the component to the normal state
      $scope.hidden = false;
      $scope.isOpen = false;
      $scope.hover = false;
      $scope.shareList = [
        { name: "facebook" },
        { name: "linkedin" },
        { name: "twitter" }
      ];

      var title = productsDetail.title;
      var description = productsDetail.description;
      var backgroundColor = 'background-bg-light';
      var shareImage = productsDetail.getCoverUrl();
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

