'use strict';

angular.module('xbertsApp')
  .factory('ProductDeals',['$state','urlParser','$sce','SystemConstant',ProductDeals]);
function ProductDeals($state,urlParser,$sce,SystemConstant) {

  function ProductDeals(data) {
    angular.extend(this, data);
  }

  ProductDeals.prototype = {
    getDealsAvatar: function () {
      return this.owner != null?this.owner.avatar : '';
    },
    getDealsName: function () {
      return this.owner != null?this.owner.firstName : "Editors' Pick";
    },
    getImageUrl: function(url, domain) {
      if(url == null) {
        return false;
      }
      var use = SystemConstant.IMAGE_UPLOAD_TYPE[domain].use;
      var category = SystemConstant.IMAGE_UPLOAD_TYPE[domain].category;
      var list = SystemConstant.IMAGE_UPLOAD_TYPE[domain].list1;
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
    getFixedImageUrl: function(url, domain) {
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
    getCoverUrl: function(url, domain) {
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
    getGiftUrl: function(url, domain) {
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
    getGiftCoverUrl: function(url, domain) {
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
    getPostId: function() {
      return this.owner != null?this.owner.id : false;
    },
    getVideo: function() {
      var baseUrl = null, baseKey = null;
      switch(urlParser.parse(this.videoUrl).hostname){
        case 'www.youtube.com':
          baseUrl = '//www.youtube.com/embed/';
          baseKey = urlParser.parse(this.videoUrl).searchObject.v;
          baseUrl = !baseKey?null:$sce.trustAsResourceUrl(baseUrl + baseKey);
          break;
        case 'youtu.be':
          baseUrl = '//www.youtube.com/embed/';
          baseUrl = $sce.trustAsResourceUrl(baseUrl +urlParser.parse(this.videoUrl).pathname.split('/')[1]);
          break;
        case 'vimeo.com':
          baseUrl = '//player.vimeo.com/video/';
          baseUrl = $sce.trustAsResourceUrl(baseUrl +urlParser.parse(this.videoUrl).pathname.split('/')[1]);
          break;
        default:
          break;
      }
      return baseUrl;
    },
    getSharePrice: function () {
      return this.salePrice.amount != '0.00' ? '$' + this.salePrice.amount : false;
    },
    getDomain: function() {
      var baseUrl = this.purchaseUrl;
      if(baseUrl == '') {
        return '';
      }
      var host = urlParser.parse(baseUrl).hostname.split('.');
      if(host.length == 2) {
        return host[0];
      } else if(host.length == 3) {
        return host[1];
      } else if(host.length == 4) {
        return host[2];
      }
      return '';
    },
    buyNow: function (category) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'buy-product-btn-click',
          category:category,
          productTitle: this.title
        });
      }

      window.open(this.purchaseUrl);
    },
    getShareUrl: function(id) {
      return $state.href("application.productDeals.dealsDetail", {dealsId:id},{absolute:true});
    }
  };

  ProductDeals.build = function (data) {
    return new ProductDeals(data);
  };

  ProductDeals.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return ProductDeals.build(item);
    });

    return data;
  };

  ProductDeals.buildList = function (data) {
    return data.map(function (item) {
      return ProductDeals.build(item);
    })
  };

  return ProductDeals;
}
