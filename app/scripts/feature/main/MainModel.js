angular.module('xbertsApp')
  .factory('MainModel', ['$state',MainModel]);


function MainModel($state) {

  function MainModel(data) {
    angular.extend(this, data);
  }

  MainModel.prototype = {
    getOwner: function () {
      return this.owner;
    },
    getOwnerPosition: function() {
      if(this.owner.position && this.owner.company) {
        return this.owner.position + " @ " + this.owner.company;
      } else if(this.owner.position && !this.owner.company) {
        return this.owner.position;
      } else if(this.owner.company) {
        return this.owner.company;
      }
    },
    getPosition: function() {
      if(this.owner.position && this.owner.company) {
        return this.owner.position + " @ " + this.owner.company;
      } else if(this.owner.position && !this.owner.company) {
        return this.owner.position;
      } else if(this.owner.company) {
        return this.owner.company;
      }
    },
    getReviewer: function () {
      return this.applicant.reviewer;
    },
    getReviewBadgePoint: function() {
      return this.applicant.reviewer.badge_point;
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
    },
    isFlashsale: function () {
      return this.flashsale && this.flashsale.shopGatewayInventoryId !== '0';
    },
    getShareUrl: function(id) {
      return $state.href("application.blogReport", {blogId:id},{absolute:true});
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
