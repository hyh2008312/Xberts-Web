angular.module('xbertsApp')
  .factory('FacebookService', ['$q', function ($q) {

    function inviteFriend() {
      FB.ui({
        method: 'apprequests',
        message: 'Your Message diaolog'
      });
    }

    return {
      inviteFriend: inviteFriend
    }
  }]);
