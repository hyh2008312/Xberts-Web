'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.TargetGeo
 * @description
 * # TargetGeo
 * Factory in the yeodjangoApp.
 */
angular.module('yeodjangoApp')
    .factory('SystemData', ['$resource', '$rootScope', '$q', function ($resource, $rootScope, $q) {
        // ...
        var targetGeoResource = $resource('/projects/rest/target_geos/', null);
        var supportTypeResource = $resource('/projects/rest/support_types/', null);
        var projectTypeResource = $resource('/projects/rest/project_categories/', null);
        var transportationModelResource = $resource('/projects/rest/transportation_models/', null);

        var targetGeos = null;
        var transportationModels = null;
        var supportTypes = null;
        var projectTypes = null;

        var systemData = {};
        systemData.stringParseToCheckboxes = function (string, checkboxes) {
            //id selected
            var trueCheckboxes = string.split(",");
            for (var j = 0; j < trueCheckboxes.length; j++) {
                for (var i = 0; i < checkboxes.length; i++) {
                    if (Number(checkboxes[i].id)=== Number(trueCheckboxes[j])) {
                        checkboxes[i].selected = true;
                    }
                }
            }
        };
        var checkboxClear=function(checkboxes){
          for(var i=0;i<checkboxes.length;i++){
            checkboxes.selected=false;
          }
        };
        systemData.getProjectTypes=function(){
          return projectTypes;
        };
        systemData.getProjectTypesPromise = function () {
            var delay = $q.defer();
            if (projectTypes === null) {
                projectTypeResource.query(function (results) {
                    projectTypes = results;
                    delay.resolve(projectTypes);
                });
            } else {
                delay.resolve(projectTypes);
            }
            return delay.promise;
        };
        systemData.getTargetGeos=function(){
          checkboxClear(supportTypes);
          return targetGeos;
        };
        systemData.getTargetGeosPromise = function () {
            var delay = $q.defer();
            if (targetGeos === null) {
                targetGeoResource.query(function (results) {
                    targetGeos = results;
                    delay.resolve(targetGeos);
                });
            }
            else {
                checkboxClear(targetGeos);
                delay.resolve(targetGeos);
            }
            return delay.promise;
        };
        systemData.getSupportTypes=function(){
          checkboxClear(supportTypes);
          return supportTypes;
        };
        systemData.getSupportTypesPromise = function () {
            var delay = $q.defer();
            if (supportTypes === null) {
                supportTypeResource.query(function (results) {
                    supportTypes = results;
                    delay.resolve(supportTypes);
                });
            } else {
                checkboxClear(supportTypes);
                delay.resolve(supportTypes);
            }
            return delay.promise;
        };
        systemData.getTransportationModels=function(){
          return transportationModels;
        };
        systemData.getTransportationModelsPromise = function () {
            var delay = $q.defer();
            if (transportationModels === null) {
                transportationModelResource.query(function (results) {
                    transportationModels = results;
                    delay.resolve(transportationModels);
                });
            } else {
                delay.resolve(transportationModels);
            }
            return delay.promise;
        };

        // Public API here
        return systemData;
    }]);
