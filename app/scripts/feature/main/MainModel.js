angular.module('xbertsApp')
  .factory('MainModel', ['$state','SystemConstant',MainModel]);


function MainModel($state,SystemConstant) {

  function MainModel(data) {
    angular.extend(this, data);
  }

  MainModel.prototype = {
    getOwner: function () {
      return this.owner;
    },
    getArticlesImage: function(url, domain) {
      if(url == null) {
        return false;
      }
      var use = SystemConstant.IMAGE_UPLOAD_TYPE[domain].use;
      var category = SystemConstant.IMAGE_UPLOAD_TYPE[domain].category;
      var list = SystemConstant.IMAGE_UPLOAD_TYPE[domain].list;
      var originUrl = SystemConstant.IMAGE_UPLOAD_TYPE[domain].originUrl;
      var baseUrl = SystemConstant.IMAGE_BASE_URL;
      var domainFile = url.split(baseUrl)[1];
      if(domainFile != null) {
        var file = url.split(originUrl)[1];
        if(file != null) {
          return SystemConstant.IMAGE_ACCESS_URL + '/public/' + category + '/' + use + '/' + list + '/' + file;
        } else {
          return SystemConstant.IMAGE_ACCESS_URL + domainFile;
        }
      } else {
        return url;
      }
    },
    getBlogsImage: function(url, domain) {
      if(url == null) {
        return false;
      }
      var use = SystemConstant.IMAGE_UPLOAD_TYPE[domain].use;
      var category = SystemConstant.IMAGE_UPLOAD_TYPE[domain].category;
      var detail = SystemConstant.IMAGE_UPLOAD_TYPE[domain].detail;
      var originUrl = SystemConstant.IMAGE_UPLOAD_TYPE[domain].originUrl;
      var baseUrl = SystemConstant.IMAGE_BASE_URL;
      var domainFile = url.split(baseUrl)[1];
      if(domainFile != null) {
        var file = url.split(originUrl)[1];
        if(file != null) {
          return SystemConstant.IMAGE_ACCESS_URL + '/public/' + category + '/' + use + '/' + detail + '/' + file;
        } else {
          return SystemConstant.IMAGE_ACCESS_URL + domainFile;
        }
      } else {
        return url;
      }
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
