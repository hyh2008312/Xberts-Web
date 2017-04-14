angular.module('xbertsApp')
  .directive('creditBadge', function () {
    return {
      restrict: 'E',
      scope: {
        points: '='
      },
      templateUrl: 'scripts/feature/credit/creditBadge/credit-badge.html',
      link: function (scope, element, attrs, ctrls) {
        scope.badge = null;
        var badges = [
          'https://xberts.imgix.net/static/logo/3c304887-929a-4b4a-8e47-7401f703ec26.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=8939c30153000eb279e9690cc2b658a9',
          'https://xberts.imgix.net/static/logo/ba15bcf4-7d05-48b1-bba2-44b5a4cd95a0.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=1d9d67c008a7907a3a588fc37a472151',
          'https://xberts.imgix.net/static/logo/b0a1cdd4-d18d-4cf3-a1a0-7ba187232645.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=d96410c787d1f09ce34d453f1682ae02'
        ];
        if(scope.points >= 200 && scope.points < 500) {
          scope.badge = badges[0];
        } else if(scope.points >= 500 && scope.points < 800) {
          scope.badge = badges[1];
        } else if(scope.points >= 800) {
          scope.badge = badges[2];
        }
      }
    }
  });
