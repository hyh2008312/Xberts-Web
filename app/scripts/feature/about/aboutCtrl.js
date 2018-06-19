'use strict';

angular.module('xbertsApp')
  .controller('AboutCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
      var title = 'About Xberts';
      var description = 'Xberts is a Y Combinator funded company located in Silicon Valley and China. Our team is comprised of industry experts who are passionate about new technologies and creative designs.';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    }]);
