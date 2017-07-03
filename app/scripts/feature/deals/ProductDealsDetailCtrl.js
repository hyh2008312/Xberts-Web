'use strict';

angular.module('xbertsApp')
  .controller('ProductDealsDetailCtrl', ['$rootScope','$scope','productsDetail','productsPaginator', 'InviteService',
    'BrowserUtil','ExpertService','Paginator','ProductDeals','DealsService','$mdMedia','$state',
    function($rootScope,$scope,productsDetail,productsPaginator, InviteService,BrowserUtil,ExpertService,Paginator,
             ProductDeals,DealsService,$mdMedia,$state) {
      $scope.productsDetail = productsDetail;
      $scope.productsPaginator = productsPaginator;
      $scope.headImage = DealsService.headImage;
      $scope.expert = {
        userId: productsDetail.owner.id
      };

      if(productsDetail.owner != null) {
        ExpertService.getAchievement(productsDetail.owner.id).then(function(data) {
           $scope.achievement = data;
        });

        var par = {
          name: 'other_posts_' + productsDetail.owner.id,
          objClass: ProductDeals,
          params: {
            owner: productsDetail.owner.id,
            page_size:12
          },
          fetchFunction: DealsService.getDealsList
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
            tab:'posts',
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
      var description = productsDetail.description.replace(/(?:<([^>]+)>)/ig, "").replace(/(?:&[^;]{2,6};)/ig, "");
      var backgroundColor = 'background-bg-light';
      var shareImage = productsDetail.imageGroup.length > 0 ? productsDetail.imageGroup[0].imageUrls.original:productsDetail.imageUrl;
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

