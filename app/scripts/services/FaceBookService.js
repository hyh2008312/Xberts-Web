angular.module('xbertsApp')
  .factory('FacebookService', ['$q', function ($q) {

    function inviteFriend() {
      FB.ui({
        method: 'send',
        link: 'https://www.xberts.com'
      });
    }

    return {
      inviteFriend: inviteFriend
    }
  }]);
