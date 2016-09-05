'use strict';

angular.module('xbertsApp')
  .service('ShopifyService', ['$', '$window', '$resource', 'Configuration', 'Sales',
    function ($, $window, $resource, Configuration, Sales) {
      var client = ShopifyBuy.buildClient({
        apiKey: Configuration.shopifyKey,
        myShopifyDomain: Configuration.shopifyDomain,
        appId: Configuration.shopifyAppId
      });

      this.fetchProduct = function (inventoryId) {
        return client.fetchProduct(inventoryId);
      };


      this.buy = function (saleId, varient, user, quantity) {
        var checkoutUrl;

        return client.createCart()
          .then(function (cart) {
            return cart.addVariants({variant: varient, quantity: quantity});
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
