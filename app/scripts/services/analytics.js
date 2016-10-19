'use strict';

angular.module('xbertsApp')
  .service('AnalyticsService', function() {
    this.sendPageView = function(url, title, projectCategory) {
      if (!dataLayer) {
        return;
      }

      var data = {
        'event': 'VirtualPageview',
        'virtualPageURL': url,
        'virtualPageTitle': title
      };

      if (projectCategory) {
        data.projectCategory = projectCategory;
      }

      dataLayer.push(data);
    };
  });
