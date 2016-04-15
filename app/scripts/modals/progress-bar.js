'use strict';

angular.module('xbertsApp')
  .provider('ProgressBarModal', function() {
    return {
      options: {
        cancel: true
      },
      $get: ['$uibModal', function($uibModal) {
        var $modal = {};

        $modal.open = function open(modalOptions, fileName) {
          modalOptions.templateUrl = 'views/modal/progress-bar.html';
          modalOptions.controller = 'ProgressBarCtrl';
          modalOptions.backdrop = 'static';
          modalOptions.windowClass = 'dialog-vertical-center';
          modalOptions.resolve = {
            fileName: function () {
              return fileName;
            }
          };

          return $uibModal.open(modalOptions);
        };

        return $modal;
      }]
    }
  })
  .controller('ProgressBarCtrl', ['$scope', 'fileName', function($scope, fileName) {
    $scope.fileName = fileName;
  }]);
