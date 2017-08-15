angular.module('xbertsApp')
  .directive('dealsListMain', ['DealsService','$mdDialog','DealsFactory','$state','$rootScope','BrowserUtil',
    function (DealsService,$mdDialog,DealsFactory,$state,$rootScope,BrowserUtil) {
      return {
        restrict: 'E',
        scope: {
          deals: '='
        },
        templateUrl: 'scripts/feature/deals/dealsListMain/deals-list-main.html',
        link: function (scope, element, attrs, ctrls) {
          scope.deals = scope.deals || [];

          scope.headImage = DealsService.headImage;

          scope.page = 0;

          scope.openMobileDialog = function(id) {

            $mdDialog.show({
              controller: function(scope, $mdDialog) {

                if( DealsFactory.signupPicture == null) {
                  DealsFactory.signupPicture = DealsFactory.signupPictureList[Math.floor(Math.random() * 4)];
                }

                scope.image = DealsFactory.signupPicture;

                scope.cancel = function() {
                  $mdDialog.cancel();
                  $state.go('application.dealsDetail',{dealsId:id});
                };

                scope.signup = function() {
                  if(!$rootScope.user.authRequired(true)) {
                    return;
                  }
                };
              },
              templateUrl: 'scripts/feature/deals/dealsDialog/deals-dialog.html',
              parent: angular.element(document.body),
              clickOutsideToClose: false,
              disableParenScroll: true
            });
          };

          scope.onSwipeLeft = function() {
            if(scope.isMobile) {
              return false;
            }
            var width = 168;
            scope.page++;
            if(scope.page > scope.deals.length / 2) {
              scope.page = Math.floor(scope.deals.length / 2);
            }
            element.find('.xb-main-deals').animate({
              scrollLeft:2 * scope.page * width + 'px'
            },300);

          };

          scope.onSwipeRight= function() {
            if(scope.isMobile) {
              return false;
            }
            var width = 168;
            scope.page--;
            if(scope.page < 0) {
              scope.page = 0;
            }
            element.find('.xb-main-deals').animate({
              scrollLeft:2 * scope.page * width + 'px'
            },300);

          };

          scope.isMobile = BrowserUtil.isIos();

        }
      }
    }]);
