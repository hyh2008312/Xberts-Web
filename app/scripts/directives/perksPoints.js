'use strict';

angular.module('xbertsApp')
  .directive('perksPoints', ['$rootScope', 'ExpertService','localStorageService', 'moment','$mdDialog',
    function ($rootScope, ExpertService, localStorageService, moment, $mdDialog) {
    return {
      template: '<span class="md-headline xb-perks-points">+ {{points > 1 ? points + " Points": points + " Point"}}</span>',
      restrict: 'E',
      replace: true,
      link: function(scope, element, attrs, ctrls) {

        //scope.$emit('perksPointsDaily', 'ready');
        //scope.$emit('perksPointsOn', 100);
        scope.points = 0;
        scope.daily = 0;
        scope.$on('perksPointsDaily', function (e, d) {
          ExpertService.getPoints($rootScope.user.getUserId()).then(function(data) {
            scope.daily = data.dailyPoints;
          });
        });
        $rootScope.$on('perksPointsOn', function (e, d) {
          var year = moment().year();
          var month = moment().month();
          var date = moment().date();
          var day = (month < 10 ? '0' + month : month)+'-'+(date < 10 ? '0' + date : date)+'-'+(year < 10 ? '0' + year : year);

          if(scope.daily + d > 100 && !localStorageService.get('myPerksPointsDaily_' + $rootScope.user.getUserId() + '_' + day)) {
            localStorageService.set('myPerksPointsDaily_' + $rootScope.user.getUserId() + '_' + day,day);
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(angular.element(document.body)))
                .clickOutsideToClose(true)
                .disableParentScroll(true)
                .textContent("Well done! You have hit the daily limit of 100 points today. Thanks for being active!")
                .ariaLabel('Alert Dialog')
                .ok('GOT IT')
                .targetEvent(e)
            );
            return false;
          }
          if(scope.daily + d > 100 && localStorageService.get('myPerksPointsDaily_' + $rootScope.user.getUserId() + '_' + day)) {
            return false;
          }
          scope.points = d;
          scope.daily += d;
          element.addClass('animation-perks-points');
          ExpertService.getPoints($rootScope.user.getUserId()).then(function(data) {
            scope.daily = data.dailyPoints;
          });
        });
        element.on('animationend', function() {
          element.removeClass('animation-perks-points');
        })
      }
    };
  }]);
