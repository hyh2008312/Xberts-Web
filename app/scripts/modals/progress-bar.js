'use strict';

angular.module('xbertsApp')
  .provider('ProgressBarModal', function() {
    return {
      options: {
        cancel: true
      },
      $get: ['$mdDialog','$rootScope',function($mdDialog,$rootScope) {
        var $modal = {};

        $modal.open = function(modalOptions, fileName, ev) {

          return $mdDialog.show({
            controller: function(scope, $mdDialog) {
              scope.show = false;
              if(scope.progress == 0) {
                scope.show = true;
              }
              scope.fileName = fileName;
              scope.cancel = function() {
                $mdDialog.cancel();
                $rootScope.$emit('uploadCancel', false);
              };
            },
            preserveScope:true,
            scope:modalOptions.scope,
            templateUrl: 'views/modal/progress-bar.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            disableParenScroll: true,
            resolve: {
              fileName: function () {
                return fileName;
              }
            }
          });
        };

        $modal.close = function() {
          $mdDialog.hide();
        };

        return $modal;
      }]
    }
  });
