angular.module('xbertsApp')
  .factory('Review', ['$state',ReviewModel]);


function ReviewModel($state) {

  function Review(data) {
    angular.extend(this, data);
  }

  Review.prototype = {
    getFlashSale: function () {
      return this.flashsale.salePrice.amount;
    },
    getDeposit: function () {
      return this.deposit.depositAmount.amount;
    },
    getRetailPrice: function () {
      return this.project.retailPrice.amount;
    },
    isPaidTrial: function () {
      return this.isFlashsale() || this.isDepositTrial()
    },
    isFlashsale: function () {
      return this.flashsale && this.flashsale.shopGatewayInventoryId !== '0';
    },
    isDepositTrial: function () {
      return this.deposit && this.deposit.shopGatewayInventoryId !== '0';
    },
    offPercentage: function () {
      if (this.flashsale) {
        var retailPrice = this.project.retailPrice.amount;
        var salePrice = this.flashsale.salePrice.amount;
        var decimal = (retailPrice - salePrice) / retailPrice;
        return Math.round(decimal * 100);
      } else {
        return 0;
      }
    },
    getShareUrl: function(id) {
      return $state.href("application.testingcampaign", {reviewId:id},{absolute:true});
    },
    buyNow: function (category) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'buy-product-btn-click',
          category:category,
          productTitle: this.project.name
        });
      }

      window.open(this.project.buyUrl);
    }
  };
  Review.build = function (data) {
    var review = new Review(data);
    return review;
  };
  Review.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return Review.build(item);
    });

    return data;
  };

  return Review;
}
