angular.module('xbertsApp')
  .controller('QuestionListPage', ['$rootScope','askPaginator','topReviewers',function ($rootScope,askPaginator, topReviewers) {

    var askCtrl = this;
    askCtrl.askPaginator = askPaginator;
    askCtrl.topReviewers = topReviewers.items;


    var title = 'Discover - Amazing finds curated by experts';
    var description = 'Stay up-to-date on the latest tech gadgets and find hand picked products suited to your unique needs.';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

