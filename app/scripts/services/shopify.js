'use strict';

angular.module('xbertsApp')
  .service('ShopifyService', ['$window', '$resource', 'Configuration', 'BrowserUtil',
    function($window, $resource, Configuration, BrowserUtil) {
      var client = ShopifyBuy.buildClient({
        apiKey: Configuration.shopifyKey,
        myShopifyDomain: Configuration.shopifyDomain,
        appId: Configuration.shopifyAppId
      });

      this.buy = function(inventoryId, user, quantity) {
        return client.fetchProduct(inventoryId)
          .then(function(product) {
            var checkoutUrl = product.selectedVariant.checkoutUrl(quantity);
            // Autofill email in checkout form with user's account email
            checkoutUrl = checkoutUrl + '&checkout[email]=' + user.getUserEmail();

            if (BrowserUtil.isMobile()) {
              $window.location.href = checkoutUrl;
            } else {
              $window.open(checkoutUrl, 'Checkout', 'width=1000,height=845');
            }
          });
      };
  }]);
