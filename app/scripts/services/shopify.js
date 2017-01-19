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


      this.buy = function (saleId, saleVariant, saleQuantity, depositId, depositVariant, user) {
        var checkoutUrl;
        var cartId;

        return client.createCart()
          .then(function (cart) {
            var items = [];

            if (saleId && saleVariant) {
              items.push({variant: saleVariant, quantity: saleQuantity});
            }

            if (depositId && depositVariant) {
              items.push({variant: depositVariant, quantity: 1});
            }

            return cart.addVariants.apply(cart, items);
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
            cartId = cart.id;

            if (saleId && saleVariant) {
              return Sales.createOrder(saleId, saleQuantity, cartId);
            }
          })
          .then(function () {
            if (depositId && depositVariant) {
              return Sales.createDepositOrder(depositId, cartId);
            }
          })
          .then(function (data) {
            $window.location.href = checkoutUrl;
          });
      };
    }]);
