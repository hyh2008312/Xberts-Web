angular
  .module('xbertsApp')
  .directive('ratingLine', function () {
    return {
      restrict: 'E',
      scope: {
        value: '@'
      },
      link: function (scope, element) {


        var rating = angular.element('<div class="xb2-rating"/>');

        var ratingUnderline = angular.element('<div class="xb2-rating__underline"/>');

        var ratingFrontline = angular.element('<div class="xb2-rating__frontline"/>');

        ratingFrontline.css({
            'width': Number(scope.value) * 100 + '%'
          }
        );
        rating.append(ratingUnderline);
        rating.append(ratingFrontline);

        element.append(rating);
      }
    };
  })
  .directive('ratingStar', function () {
    return {
      restrict: 'E',
      templateUrl:'scripts/feature/review/report/rating.html',
      scope: {
        value: '@'
      },
      link: function (scope, element) {

        scope.stars=[];
        for(var i=1; i<=5; i++){
          scope.stars.push({
            icon:'star'
          })
        }

        scope.value=Number(scope.value);
        var valueInt = Math.floor(scope.value);
        if (valueInt !== scope.value) {
          scope.stars[valueInt].icon = 'star_half';
          scope.stars[valueInt].color = 'md-accent';
        }


        for(var i=1; i<=5; i++){
          if(i<=valueInt){
            scope.stars[i-1].color='md-accent'
          }
        }

      }
    };
  })
;
