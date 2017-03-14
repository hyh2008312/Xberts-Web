angular.module('xbertsApp')
  .controller('ShareProductListPageCtrl', ['productsPaginator','categories','$scope','$window',function (productsPaginator, categories, $scope, $window) {
    var productCtrl = this;
    productCtrl.productsPaginator = productsPaginator;

    productCtrl.categories = categories;
  }]);

