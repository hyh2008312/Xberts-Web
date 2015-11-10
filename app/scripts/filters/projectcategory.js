'use strict';

/**
 * @ngdoc filter
 * @name yeodjangoApp.filter:projectCategory
 * @function
 * @description
 * # projectCategory
 * Filter in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
  .filter('projectCategory', ['SystemData', function (SystemData) {
    var projectTypes;
    SystemData.getProjectTypes().then(function (results) {
      projectTypes = results;
    });
    var projectCategoryFilter=function (input) {
      var projectCategoryName="";
      for(var i= 0;i<projectTypes.length;i++){
        if(projectTypes[i].id===input){
          projectCategoryName=projectTypes[i].name;
          break;
        }
      }
      return projectCategoryName;
    };
    return projectCategoryFilter;
  }]);
