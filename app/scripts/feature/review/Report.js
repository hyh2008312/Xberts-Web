angular.module('xbertsApp')
  .factory('Report', ReportModel);


function ReportModel() {


  function Report(data) {
    angular.extend(this, data);
  }

  Report.prototype = {
    getProductRetailPrice: function () {
      return this.applicant.review.project.retail_price.amount;
    },
    isHasFinalPrice: function () {
      return this.applicant.review.project.final_price.amount !== '0.00';
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
    getReviewerFullName: function () {
      return this.applicant.reviewer.userprofile.first_name + " " + this.applicant.reviewer.userprofile.last_name;
    },
    getReviewerAvatar: function () {
      return this.applicant.reviewer.avatar;
    },
    getReviewerId: function () {
      return this.applicant.reviewer.id;
    },
    getReviewerPosition: function () {
      if(this.applicant.reviewer.userprofile.position && this.applicant.reviewer.userprofile.company) {
        return this.applicant.reviewer.userprofile.position + " @ " + this.applicant.reviewer.userprofile.company;
      } else if(this.applicant.reviewer.userprofile.position && !this.applicant.reviewer.userprofile.company) {
        return this.applicant.reviewer.userprofile.position;
      } else if(this.applicant.reviewer.userprofile.company) {
        return this.applicant.reviewer.userprofile.company;
      }
    },
    getScore: function () {
      var temp = [(this.presentation + this.cost_performance + this.usability) / 3] * 10;
      return Math.round(temp) / 10;
    },
    getReviewBadgePoint: function() {
      return this.applicant.reviewer.badge_point;
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
      if(!angular.isArray(data.pros)) {
        data.pros = data.pros.split('##');
      }
    } else {
      data.pros = [];
    }
    if (data.cons) {
      if(!angular.isArray(data.cons)) {
        data.cons = data.cons.split('##');
      }
    } else {
      data.cons = [];
    }

    return new Report(data);
  };

  Report.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return Report.build(item);
    });

    return data;
  };

  return Report;
}
