'use strict';

angular.module('xbertsApp')
  .factory('ProjectLaunch', function () {
    var projectResource={};
    var organizationResource={};
    var distributionsResources={};
    var projectLaunch={};
    projectLaunch.setProjectResource=function(resource){
      projectResource=resource;
    };
    projectLaunch.setOrganizationResource=function(resource){
      organizationResource=resource;
    };
    projectLaunch.setDistributionsResource=function(resources){
      distributionsResources=resources;
    };
    projectLaunch.getProjectResource=function(){
      return projectResource;
    };
    projectLaunch.getOrganizationResource=function(){
      return organizationResource;
    };
    projectLaunch.getDistributionsResource=function(){
      return distributionsResources;
    };
    return projectLaunch;
  });
