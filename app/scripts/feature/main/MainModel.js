angular.module('xbertsApp')
  .factory('MainModel', MainModel);


function MainModel() {

  function MainModel(data) {
    angular.extend(this, data);
  }

  MainModel.prototype = {
    getReviewer: function () {
      return this.applicant.reviewer;
    },
    getReview: function() {
      return this.applicant.review;
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

  MainModel.build = function (data) {
    return new MainModel(data)
  };

  MainModel.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return MainModel.build(item);
    });

    return data;
  };

  MainModel.buildList = function (data) {
    return data.map(function (item) {
      return MainModel.build(item);
    })
  };

  return MainModel;
}
