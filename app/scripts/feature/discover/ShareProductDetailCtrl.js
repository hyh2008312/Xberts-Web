angular.module('xbertsApp')
  .controller('ShareProductDetailCtrl', ['$rootScope', 'productsDetail', 'recommendList', function ($rootScope, productsDetail, recommendList) {
    var productDetailCtrl = this;
    productDetailCtrl.productsDetail = productsDetail;
    productDetailCtrl.recommendList = recommendList;

    var title = productsDetail.title;
    var description = productsDetail.description;
    var backgroundColor = 'background-bg-light';
    var shareImage = productsDetail.getImageOriginal();
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

