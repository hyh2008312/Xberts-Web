'use strict';

angular.module('xbertsApp')
  .controller('ProductDealsDetailCtrl', ['$rootScope','$scope','productsDetail','productsPaginator', 'InviteService',
    'BrowserUtil','ExpertService','Paginator','ProductDeals','DealsService','$mdMedia','$state','DealsFactory',
    '$stateParams',
    function($rootScope,$scope,productsDetail,productsPaginator,InviteService,BrowserUtil,ExpertService,Paginator,
             ProductDeals,DealsService,$mdMedia,$state, DealsFactory,$stateParams) {

      $scope.$parent.isPopupOpen = !$stateParams.isPopupOpen;
      $scope.isPopupOpen = $stateParams.isPopupOpen;
      $rootScope.showToobar = $scope.isPopupOpen;
      $scope.categoryItem = DealsFactory.categoryItem;

      if(!$scope.isPopupOpen) {
        $rootScope.isScroll = false;
      }

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

      $rootScope.$on('$stateChangeStart', function () {
        if($rootScope.state.current.name == 'application.productDeals.dealsDetail') {
          if($scope.$parent != null) {
            $scope.$parent.isPopupOpen = !$stateParams.isPopupOpen;
            $scope.$parent.display = true;
            $scope.isPopupOpen = $stateParams.isPopupOpen;
          }
          $rootScope.showToobar = $scope.isPopupOpen;
        }
      });

      $scope.$watch('$viewContentLoading', function() {
        if(angular.element('.xb-cover-view').length>0) {
          angular.element('.xb-cover-view').animate({
            scrollTop: 0
          },10);
        }
        if(!$rootScope.showToobar) {
          if(angular.element('.xb-body-view').length>0) {
            angular.element('.xb-body-view').animate({
              scrollTop: 0
            },10);
          }
        }
      });

      $scope.close = function() {
        if($scope.$parent != null) {
          $scope.$parent.isPopupOpen = false;
          $scope.$parent.display = false;
          $scope.isPopupOpen = false;
          if(DealsFactory.categoryItem == 'everything') {
            $rootScope.isScroll = false;
          }
        }
        $rootScope.showToobar = false;

        $state.go('application.productDeals',{tab:DealsFactory.categoryItem});
      };

      $scope.openPop = function(dealsId) {
        if($scope.$parent != null) {
          $scope.$parent.isPopupOpen = !$stateParams.isPopupOpen;
          $scope.$parent.display = true;
          $scope.isPopupOpen = $stateParams.isPopupOpen;
        }
        $rootScope.showToobar = $scope.isPopupOpen;
        $state.go('application.productDeals.dealsDetail',{dealsId:dealsId, isPopupOpen: true});
      };

      var title = productsDetail.title;
      var description = productsDetail.description;
      var backgroundColor = 'background-bg-light';
      var shareImage = productsDetail.getCoverUrl();
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

