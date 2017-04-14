angular.module('xbertsApp')
  .controller('PrivacyCtrl', ['$rootScope', function ($rootScope) {

      var title = 'Xberts – Privacy Policy';
      var description = 'This Xberts privacy policy (the "Privacy Policy") is intended to inform you of our policies and ' +
        'practices regarding the collection, use and disclosure of any information you submit to us through Xberts.com. ' +
        'This includes "Personal Information," which is information about you that is personally identifiable such as your ' +
        'name, e-mail address, user ID number, and other non-public information that is associated with the foregoing, as' +
        ' well as "Anonymous Information," which is information that is not associated with or linked to your Personal ' +
        'Information and does not permit the identification of individual persons.';
      var backgroundColor = 'background-bg-light';
      var shareImage = '';
      $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);

  }]);

