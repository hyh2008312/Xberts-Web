angular.module('xbertsApp')
  .directive('questionItem',['$rootScope','AskService','InviteService','localStorageService',
    function ($rootScope,AskService,InviteService,localStorageService) {
    return {
      restrict: 'E',
      scope: {
        products: '=',
        hideAnswer: '=',
        isAll: '=',
        openPop: '&'
      },
      templateUrl: 'scripts/feature/ask/questionItem/question-item.html',
      link: function (scope, element, attrs, ctrls) {

        scope.admin = AskService.order == 3? 'true': null;

        scope.follow = function(product) {
          if(!$rootScope.user.authRequired()) {
            return;
          }
          AskService.follow(product.id).then(function(data) {
            var followeeList = $rootScope.user.getFollowedQuestions();
            if(product.currentUser) {
              product.currentUser.follow = data.follow;
            } else {
              product.currentUser = {};
              product.currentUser.follow = data.follow;
            }

            if(data.follow) {
              product.followeeCount++;
              followeeList.unshift(product.id);
              $rootScope.user.setFollowedQuestions(followeeList);
            } else {
              product.followeeCount--;
              var index = 0;
              angular.forEach(followeeList, function(e,i) {
                if(e == product.id) {
                  index = i;
                }
              });
              followeeList.splice(index,1);
              $rootScope.user.setFollowedQuestions(followeeList);
            }

            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_currentPage');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_items');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_next');
            localStorageService.remove('following_answers_list_' + $rootScope.user.getUserId() + '_count');
          }, function() {});
        };

        // FAB Speed Dial Component
        // Set the component to the normal state
        scope.hidden = false;
        scope.isOpen = false;
        scope.hover = false;
        scope.shareList = [
          { name: "facebook" },
          { name: "linkedin" },
          { name: "twitter" }
        ];

        scope.inviteObj = angular.copy(InviteService, {});

        scope.getFollowees = function(product) {

          product.currentUser = {};

          for(var i = 0; i < followeeList.length;i++) {
            if(product.id == followeeList[i]) {
              product.currentUser.follow = true;
              return true;
            }
          }

          product.currentUser.follow = false;
          return false;
        };

        $rootScope.$on('$stateChangeSuccess', function() {
          scope.changeProducts();
        });

        scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          //you also get the actual event object
          //do stuff, execute functions -- whatever...

          scope.changeProducts();
        });

        scope.changeProducts = function() {

          var followeeList = $rootScope.user.getFollowedQuestions();

          angular.forEach(scope.products, function(e) {
            e.currentUser = {
              follow : false
            };

            angular.forEach(followeeList, function(f) {
              if(f == e.id) {
                e.currentUser.follow = true;
              }
            });
          });
        };

      }
    }
  }]);
