angular.module('xbertsApp')
  .directive('dealsList', ['$rootScope','DealsService','$mdDialog','$state','DealsFactory',
    function ($rootScope, DealsService,$mdDialog,$state,DealsFactory) {
    return {
      restrict: 'E',
      scope: {
        deals: '=',
        openPop: '&',
        isDeals: '=',
        admin: '=',
        index:'='
      },
      templateUrl: 'scripts/feature/deals/dealsList/deals-list.html',
      link: function (scope, element, attrs, ctrls) {

        scope.user = $rootScope.user;

        scope.headImage = DealsService.headImage;

        scope.openMobileDialog = function(id) {

          $mdDialog.show({
            controller: function(scope, $mdDialog) {

              if( DealsFactory.signupPicture == null) {
                DealsFactory.signupPicture = DealsFactory.signupPictureList[Math.floor(Math.random() * 4)];
              }

              scope.image = DealsFactory.signupPicture;

              scope.cancel = function() {
                $mdDialog.cancel();
                $state.go('application.productDeals.dealsDetail',{dealsId:id});
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

        scope.approveList = [{
          value: 'pending'
        }, {
          value: 'approved'
        }, {
          value: 'disapproved'
        }];

        scope.updateApprove = function(product) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          DealsService.update(product).then(function(data) {

          });
        };

        scope.updateSkipped = function(product) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          product.skipped = !product.skipped;
          DealsService.setSkip(product).then(function(data) {

          });
        };

        scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          //you also get the actual event object
          //do stuff, execute functions -- whatever...

          if(scope.index == 1) {
            angular.forEach(scope.deals,function(e) {
              if(e.skipped == null) {
                e.skipped = true;
              }
            });
          }

        });

      }
    }
  }]);
