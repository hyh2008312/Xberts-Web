angular.module('xbertsApp')
  .controller('AnswerDetailCtrl', ['$rootScope', 'productsDetail', 'recommendList', function ($rootScope, productsDetail, recommendList) {
    var answerCtrl = this;
    answerCtrl.productsDetail = productsDetail;
    answerCtrl.recommendList = recommendList;

    var title = answerCtrl.title;
    var description = answerCtrl.description;
    var backgroundColor = 'background-bg-light';
    var shareImage = answerCtrl.getImageOriginal();
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

