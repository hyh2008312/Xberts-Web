'use strict';

/**
 * @ngdoc service
 * @name xbertsApp.ReviewApplicant
 * @description
 * # ReviewApplicant
 * Factory in the xbertsApp.
 */
angular.module('xbertsApp')
  .factory('ReviewApplicant', ['$resource',function ($resource) {
    // Service logic
    // ...

    var Applicant =$resource('/review/applicants/:id/', {id: '@id'});
    var applicant={};

    // Public API here
    return {
      getNewInstance: function () {
        applicant=new Applicant();
        return applicant;
      },
      getInstance:function(){
        return applicant;
      }
    };
  }]);
