angular.module('xbertsApp')
  .controller('ProductDealsListPageCtrl', ['$rootScope','productsPaginator','categories','filter', 'ShareProductService',
    function ($rootScope, productsPaginator, categories, filter, ShareProductService) {
    var dealsCtrl = this;

    dealsCtrl.categories = categories;
    dealsCtrl.productsPaginator = productsPaginator;
    dealsCtrl.categoryId = ShareProductService.categoryId;

    dealsCtrl.changeCategory = function (categoryId) {
      ShareProductService.categoryId = categoryId;
      dealsCtrl.productsPaginator.params.category = categoryId || null;
      dealsCtrl.productsPaginator.clear();
      dealsCtrl.productsPaginator.load();
    };

    var title = 'Deals - Find Great Deals Every Day';
    var description = 'Enjoy the best deals on the latest gadgets and designs';
    var backgroundColor = 'background-bg-light';
    var shareImage = '';
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
  }]);

