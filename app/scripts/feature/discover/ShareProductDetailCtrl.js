angular.module('xbertsApp')
  .controller('ShareProductDetailCtrl', ['$rootScope','productsDetail','recommendList',function ($rootScope,productsDetail,recommendList) {
    var productDetailCtrl = this;
    productDetailCtrl.productsDetail = productsDetail;
    productDetailCtrl.recommendList = recommendList;

    var title = '';
    var description = '';
    var backgroundColor = 'background-bg-white';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

