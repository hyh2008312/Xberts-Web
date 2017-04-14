angular.module('xbertsApp')
  .controller('PersonalCreditCtrl', ['$rootScope', 'expert', 'creditMain', '$scope', 'points',
    function($rootScope, expert, creditMain, $scope, points) {

    $scope.expert = expert;
    $scope.creditMain = creditMain.items;
    $scope.points = points;

    var title = 'Perks – Xberts Tech Insider reward program';
    var description = 'Earn points to win free badges & amazing gifts. Every time you interact with Xberts community or create contents for our community, your contribution will be recognized.';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);



  }]);

