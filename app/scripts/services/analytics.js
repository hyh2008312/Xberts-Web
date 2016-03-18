'use strict';

angular.module('xbertsApp')
  .service('AnalyticsService', function() {
    this.sendPageView = function(url, title) {
      if (!dataLayer) {
        return;
      }

      dataLayer.push({
        'event': 'VirtualPageview',
        'virtualPageURL': url,
        'virtualPageTitle': title
      });
    };
  });
