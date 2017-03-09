angular.module('xbertsApp')
  .controller('ShareProductListCtrl', ['products',function (products) {
    var productCtrl = this;
    productCtrl.products = products;
  }]);
