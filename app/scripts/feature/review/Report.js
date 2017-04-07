angular.module('xbertsApp')
  .factory('Report', ReportModel);


function ReportModel() {

  var AVATAR_PLACEHOLDER = 'https://xberts.imgix.net/static/icon/avatar_empty.gif?s=5b6b11a25bfa12e3a94966eb077ef16a';

  function Report(data) {
    angular.extend(this, data);
  }

  Report.prototype = {
    getProductRetailPrice: function () {
      return this.applicant.review.project.retail_price.amount;
    },
    isHasFinalPrice: function () {
      return this.applicant.review.project.final_price.amount !== '0.00'
    },
    getProductFinalPrice: function () {
      return this.isHasFinalPrice() ? this.applicant.review.project.final_price.amount : this.getProductRetailPrice();
    },
    getProductCover: function () {
      return this.applicant.review.project.image;
    },
    getProductTitle: function () {
      return this.applicant.review.project.title;
    },
    getProductStore: function () {
      return this.applicant.review.project.buy_url;
    },
    getReviewId: function () {
      return this.applicant.review.id;
    },
    getReviewerName: function () {
      return this.applicant.reviewer.fullname;
    },
    getReviewerAvatar: function () {
      return this.applicant.reviewer.avatar || AVATAR_PLACEHOLDER;
    },
    getReviewerId: function () {
      return this.applicant.reviewer.id;
    },
    getScore: function () {
      var temp = [(this.presentation + this.cost_performance + this.usability) / 3] * 10;
      return Math.round(temp) / 10;
    },
    buyNow: function (category) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'buy-product-btn-click',
          category:category,
          productTitle: this.title
        });
      }

      window.open(this.getProductStore());
    }
    
  };

  Report.build = function (data) {
    if (data.pros) {
      data.pros = data.pros.split('##');
    } else {
      data.pros = [];
    }
    if (data.cons) {
      data.cons = data.cons.split('##');
    } else {
      data.cons = [];
    }

    return new Report(data);
  };

  return Report;
}
