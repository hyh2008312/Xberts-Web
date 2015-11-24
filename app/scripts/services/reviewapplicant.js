'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.ReviewApplicant
 * @description
 * # ReviewApplicant
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
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
