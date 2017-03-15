angular.module('xbertsApp')
  .controller('ShareProductListPageCtrl', ['$rootScope','productsPaginator','categories',function ($rootScope, productsPaginator, categories) {
    var productCtrl = this;
    productCtrl.productsPaginator = productsPaginator;

    productCtrl.categories = categories;

    productCtrl.changeCategory = function (categoryId) {
      productCtrl.productsPaginator.params.category = categoryId || null;
      productCtrl.productsPaginator.clear();
      productCtrl.productsPaginator.load();
    };
    productCtrl.addProduct = function (product) {
      productCtrl.productsPaginator.items.unshift(product);
    };

    var title = '';
    var description = '';
    var backgroundColor = 'background-bg-white';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

