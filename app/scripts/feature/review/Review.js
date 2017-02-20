angular.module('xbertsApp')
  .factory('Review', ReviewModel);


function ReviewModel() {

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
    }
  };
  Review.build = function (data) {
    var review = new Review(data);
    return review;
  };

  return Review;
}
