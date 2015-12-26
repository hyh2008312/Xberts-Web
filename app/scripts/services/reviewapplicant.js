'use strict';

angular.module('xbertsApp')
  .factory('ReviewApplicant', ['$resource', 'Configuration', function($resource, Configuration) {
    var Applicant = $resource(Configuration.apiBaseUrl + '/review/applicants/:id/', {id: '@id'});
    var applicant = {};

    return {
      getNewInstance: function() {
        applicant = new Applicant();
        return applicant;
      },
      getInstance: function() {
        return applicant;
      }
    };
  }]);
