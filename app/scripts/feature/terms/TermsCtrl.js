angular.module('xbertsApp')
  .controller('TermsCtrl', ['$rootScope', function ($rootScope) {

      var title = 'Xberts – Terms of Service';
      var description = 'Please read these Terms of Service (“Agreement” or “Terms”) carefully before using the services ' +
        'offered by Xberts, Inc. This Agreement sets forth the legally binding terms and conditions for your use of the ' +
        'various websites owned and operated by Xberts, including, without limitation, the xberts.com website and domain ' +
        'name (“Sites”), the mobile application offered by Xberts (the “App”), your trial or your purchase of the products ' +
        'sold through our Sites and App (the “Products”), but not your use of such Products, and any other features, content, ' +
        'or applications offered from time to time by Xberts in connection with the above (collectively, the “Service”). By ' +
        'using the Service in any manner, whether by purchasing any Products, trying any Products for free, or just visiting ' +
        'or browsing the Sites and/or App, you agree to be bound by this Agreement.';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);

