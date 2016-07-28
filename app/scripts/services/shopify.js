'use strict';

angular.module('xbertsApp')
  .service('ShopifyService', ['$', '$window', '$resource', 'Configuration', 'Sales',
    function($, $window, $resource, Configuration, Sales) {
      var client = ShopifyBuy.buildClient({
        apiKey: Configuration.shopifyKey,
        myShopifyDomain: Configuration.shopifyDomain,
        appId: Configuration.shopifyAppId
      });

      this.buy = function(saleId, inventoryId, user, quantity) {
        var product;
        var checkoutUrl;

        return client.fetchProduct(inventoryId)
          .then(function(data) {
            product = data;

            return client.createCart();
          })
          .then(function(cart) {
            return cart.addVariants({variant: product.selectedVariant, quantity: quantity});
          })
          .then(function (cart) {
            // Autofill email in checkout form with user's account email and add cart id to order attr
            var paramStr = $.param({
              checkout: {
                email: user.getUserEmail()
              },
              attributes: {
                cartId: cart.id
              }
            });
            checkoutUrl = cart.checkoutUrl + '&' + paramStr;

            return Sales.createOrder(saleId, quantity, cart.id);
          })
          .then(function (data) {
            $window.location.href = checkoutUrl;
          });
      };
  }]);
