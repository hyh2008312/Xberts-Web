'use strict';

angular.module('xbertsApp')
  .controller('MyTrialsCtrl', ['Paginator','$scope', '$rootScope','expert','ApplicationService',
    function (Paginator,$scope, $rootScope,expert,ApplicationService) {

      $rootScope.pageSettings.setBackgroundColor('background-bg-light');
      $scope.isCurrentUser = $rootScope.user.isAuth() && $rootScope.user.getUserId() === expert.userId;

      var filter = '';
      if ($rootScope.user.getUserId() != expert.userId) {
        filter = {is_submit_report: true};
      }
      var par = {
        name: 'trials_posts_' + expert.userId,
        params: {reviewer_id: expert.userId},
        filter: filter,
        fetchFunction: ApplicationService.getApplications
      };
      $scope.reviewApplicantPaginator = new Paginator(par);
    }]);
