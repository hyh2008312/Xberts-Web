angular.module('xbertsApp')
  .directive('dealsList', ['$rootScope','DealsService','$mdDialog','$state','DealsFactory',
    function ($rootScope, DealsService,$mdDialog,$state,DealsFactory) {
    return {
      restrict: 'E',
      scope: {
        deals: '='
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
        }

      }
    }
  }]);
