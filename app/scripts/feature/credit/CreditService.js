angular.module('xbertsApp')
  .service('CreditService', ['$resource','ShareProduct','API_BASE_URL',function ($resource,ShareProduct,API_BASE_URL) {
    var CreditResource = $resource(API_BASE_URL + '/gifts/:id/', null);

    this.getList = function (params) {
      return CreditResource.get(params).$promise.then(ShareProduct.buildPageList);
    };

    this.getDetail = function (reviewId) {
      return CreditResource.get({id: reviewId}).$promise.then(ShareProduct.build);
    };

    this.badges = [
      'https://xberts.imgix.net/static/logo/3c304887-929a-4b4a-8e47-7401f703ec26.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=8939c30153000eb279e9690cc2b658a9',
      'https://xberts.imgix.net/static/logo/ba15bcf4-7d05-48b1-bba2-44b5a4cd95a0.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=1d9d67c008a7907a3a588fc37a472151',
      'https://xberts.imgix.net/static/logo/b0a1cdd4-d18d-4cf3-a1a0-7ba187232645.png?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=d96410c787d1f09ce34d453f1682ae02'
    ];

    this.topBanner = [{
      buttonColor: "button-white",
      buttonUrl : null,
      imageMobileUrl : "https://xberts.imgix.net/static/banner/b3d5c1ae-7e01-4d13-88ec-16dce191f0f8.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=2e8626dad9b562accb71ef22c03b7ff5",
      imagePcUrl : "https://xberts.imgix.net/static/banner/f30a9f3d-2a98-4209-839a-93dd7089d555.jpg?auto=format%2Cenhance&crop=edges&fit=crop&ixlib=python-1.1.2&s=6673106fd443ea0ece006607731887e6",
      subtitle : "Earn Points to Win Free Badges & Gifts",
      title : "Perks of Xberts <br>Tech Insider"
    }];

  }]);
