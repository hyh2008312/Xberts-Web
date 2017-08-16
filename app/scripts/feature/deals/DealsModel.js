'use strict';

angular.module('xbertsApp')
  .factory('ProductDeals',['$state','urlParser','$sce',ProductDeals]);
function ProductDeals($state,urlParser,$sce) {

  function ProductDeals(data) {
    angular.extend(this, data);
  }

  ProductDeals.prototype = {
    getDealsAvatar: function () {
      return this.owner != null?this.owner.userprofile.avatar : '';
    },
    getDealsName: function () {
      return this.owner != null?this.owner.firstName : "Editors' Pick";
    },
    getImageUrl: function() {
      if(this.cover) {
        return this.cover.originSm? this.cover.originSm: this.cover.origin;
      } else {
        return false;
      }
    },
    getCoverUrl: function() {
      if(this.cover) {
        return this.cover.originLg? this.cover.originLg: this.cover.origin;
      } else {
        return false;
      }
    },
    getFixedImageUrl: function() {
      if(this.cover) {
        return this.cover.fixedRecSm? this.cover.fixedRecSm: this.cover.origin;
      } else {
        return false;
      }

    },
    getFixedSqrUrl: function() {
      if(this.cover) {
        return this.cover.fixedSqrSm? this.cover.fixedSqrSm: this.cover.origin;
      } else {
        return false;
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
      return $state.href("application.dealsDetail", {dealsId:id},{absolute:true});
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
