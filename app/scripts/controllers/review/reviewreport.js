'use strict';

angular.module('xbertsApp')
  .controller('ReviewreportCtrl', ['$rootScope', '$timeout', '$interval', '$scope', '$state', '$stateParams', 'growl', 'Configuration', 'UploadService', 'ReviewReport', 'applicant', '$uibModal',
    function ($rootScope, $timeout, $interval, $scope, $state, $stateParams, growl, Configuration, UploadService, ReviewReport, applicant, $uibModal) {

      $scope.applicant = applicant;
      $rootScope.pageSettings.setBackgroundColor('background-whitem');
      $scope.reportData = {
        applicant_id: applicant.id
      };
      $scope.reportDataTemp = {};

      var preprocessProsAndCons = function () {
        var pros = '';
        if ($scope.reportDataTemp.pro_1) {
          pros = pros + $scope.reportDataTemp.pro_1;
        }
        if ($scope.reportDataTemp.pro_2) {
          pros = pros + '##' + $scope.reportDataTemp.pro_2;
        }
        if ($scope.reportDataTemp.pro_3) {
          pros = pros + '##' + $scope.reportDataTemp.pro_3;
        }
        if ($scope.reportDataTemp.pro_4) {
          pros = pros + '##' + $scope.reportDataTemp.pro_4;
        }
        if ($scope.reportDataTemp.pro_5) {
          pros = pros + '##' + $scope.reportDataTemp.pro_5;
        }
        $scope.reportData.pros = pros;


        var cons = '';
        if ($scope.reportDataTemp.con_1) {
          cons = cons + $scope.reportDataTemp.con_1;
        }
        if ($scope.reportDataTemp.con_2) {
          cons = cons + '##' + $scope.reportDataTemp.con_2;
        }
        if ($scope.reportDataTemp.con_3) {
          cons = cons + '##' + $scope.reportDataTemp.con_3;
        }
        if ($scope.reportDataTemp.con_4) {
          cons = cons + '##' + $scope.reportDataTemp.con_4;
        }
        if ($scope.reportDataTemp.con_5) {
          cons = cons + '##' + $scope.reportDataTemp.con_5;
        }
        $scope.reportData.cons = cons;

      };

      var fillReportDataTemp = function () {
        var prosArray = [];
        if ($scope.reportData.pros) {
          prosArray = $scope.reportData.pros.split("##");
        }

        $scope.reportDataTemp.pro_1 = prosArray[0] ? prosArray[0] : '';
        $scope.reportDataTemp.pro_2 = prosArray[1] ? prosArray[1] : '';
        $scope.reportDataTemp.pro_3 = prosArray[2] ? prosArray[2] : '';
        $scope.reportDataTemp.pro_4 = prosArray[3] ? prosArray[3] : '';
        $scope.reportDataTemp.pro_5 = prosArray[4] ? prosArray[4] : '';

        var consArray = [];
        if ($scope.reportData.cons) {
          consArray = $scope.reportData.cons.split("##");
        }

        $scope.reportDataTemp.con_1 = consArray[0] ? consArray[0] : '';
        $scope.reportDataTemp.con_2 = consArray[1] ? consArray[1] : '';
        $scope.reportDataTemp.con_3 = consArray[2] ? consArray[2] : '';
        $scope.reportDataTemp.con_4 = consArray[3] ? consArray[3] : '';
        $scope.reportDataTemp.con_5 = consArray[4] ? consArray[4] : '';
      };
      // try to fetch the previous data of the applicant for this survey
      $scope.$emit('backdropOn', 'report get');
      ReviewReport.get({reviewId: $stateParams.reviewId, applicant_id: applicant.id}, function (data) {
        $scope.$emit('backdropOff', 'report get completed');
        if (data.count !== undefined && data.count > 0) {
          $scope.reportData = data.results[0];
          fillReportDataTemp();
        }
        $scope.onChange($scope.reportData.details || "");
      });
      //submit

      $scope.cost_performance_error = function () {
        $scope.reportData.cost_performance = $scope.reportData.cost_performance || 0;
        return $scope.reportData.cost_performance < 1;
      };
      $scope.usability_error = function () {
        $scope.reportData.usability = $scope.reportData.usability || 0;
        return $scope.reportData.usability < 1;
      };
      $scope.presentation_error = function () {
        $scope.reportData.presentation = $scope.reportData.presentation || 0;
        return $scope.reportData.presentation < 1;
      };

      $scope.formCheck = function () {
        return $scope.reportForm.$valid && $scope.imageCount > 2 && !$scope.cost_performance_error() && !$scope.usability_error() && !$scope.presentation_error() && $scope.detailCharacterCount > 999
      };


      $scope.reportFormSubmit = function () {
        $scope.reportForm.submitted = true;

        $scope.reportData.details = $scope.reportData.details.replace(/pre-loading/ig, "");
        $scope.reportData.details = $scope.reportData.details.replace(/(<p><br><\/p>){3,}$/ig, "<p><br></p>");
        preprocessProsAndCons();

        if ($scope.formCheck()) {
          $scope.$emit('backdropOn', 'post');
          var report = new ReviewReport($scope.reportData);
          if (!report.id) {
            report.report_status = 'PUBLISHED';
            report.$save({reviewId: $stateParams.reviewId}, function (resp) {
              $scope.reportData = resp;
              $scope.$emit('backdropOff', 'success');
              $timeout(function () {
                growl.success('Your review has been submitted successfully!');
              }, 0);
              $state.go('application.report', {reviewId: $stateParams.reviewId, reportId: $scope.reportData.id});
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.');
            });
          } else {
            report.report_status = 'PUBLISHED';
            report.$put({reviewId: $stateParams.reviewId}, function (resp) {
              $scope.reportData = resp;
              $scope.$emit('backdropOff', 'success');
              $timeout(function () {
                growl.success('Your review has been submitted successfully!');
              }, 0);
              $state.go('application.report', {reviewId: $stateParams.reviewId, reportId: $scope.reportData.id});
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.');
            });
          }
          return false;
        } else {
          $scope.reportForm.submitted = true;
          $scope.reportForm.$invalid = true;
        }
      };

      var reportSave = function () {

        preprocessProsAndCons();

        console.log($scope.reportData);
        $scope.reportData.details = $scope.reportData.details.replace(/pre-loading/ig, "");
        $scope.reportData.details = $scope.reportData.details.replace(/(<p><br><\/p>){3,}$/ig, "<p><br></p>");

        var report = new ReviewReport($scope.reportData);
        report.report_status = 'DRAFT';
        if ($scope.reportForm.$valid) {
          $scope.reportForm.submitted = true;
          $scope.$emit('backdropOn', 'post');
          if (!report.id) {
            report.$save({reviewId: $stateParams.reviewId}, function (resp) {
              $scope.reportData = resp;
              $scope.$emit('backdropOff', 'success');
              growl.success('Your review has been saved successfully!');
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.');
            });
          } else {
            report.$put({reviewId: $stateParams.reviewId}, function (resp) {
              $scope.reportData = resp;
              $scope.$emit('backdropOff', 'success');
              growl.success('Your review has been saved successfully!');
            }, function (resp) {
              $scope.$emit('backdropOff', 'error');
              growl.error('Sorry,some error happened.');
            });
          }
        } else {
          $scope.reportForm.submitted = true;
          $scope.reportForm.$invalid = true;
        }

      };

      var reportAutoSave = function () {

        preprocessProsAndCons();

        $scope.reportData.details = $scope.reportData.details.replace(/pre-loading/ig, "");
        $scope.reportData.details = $scope.reportData.details.replace(/(<p><br><\/p>){3,}$/ig, "<p><br></p>");

        var report = new ReviewReport($scope.reportData);
        report.report_status = 'DRAFT';
        if ($scope.reportForm.$valid) {
          $scope.reportForm.submitted = true;
          if (!report.id) {
            report.$save({reviewId: $stateParams.reviewId}, function (resp) {
              $scope.reportData = resp;
            }, function (resp) {
            });
          } else {
            report.$put({reviewId: $stateParams.reviewId}, function (resp) {
              $scope.reportData = resp;
            }, function (resp) {
            });
          }
        } else {
          $scope.reportForm.submitted = true;
          $scope.reportForm.$invalid = true;
        }

      };

      $scope.reportSave = function () {
        reportSave();
      };


      // summerNote character amount check

      var autoSave = null;

      $scope.onChange = function (contents) {
        $scope.detailCharacterCount = contents.replace(/(?:<([^>]+)>)/ig, "").replace(/(?:&[^;]{2,6};)/ig, "").length;
        var groups = contents.match(/<img /ig);
        $scope.imageCount = angular.isArray(groups) ? groups.length : 0;
        $scope.reportForm.$pristine = true;

        if (autoSave == null) {
          autoSave = $interval(reportAutoSave, 10000);
        }
      };


      $scope.paste = function (e) {
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');

        e.preventDefault();
        $scope.setPreviousRange();

        var paragraphs = bufferText.split('\n');
        for (var i = 0; i < paragraphs.length; i++) {
          var pNode = document.createElement('p');
          var textNode = document.createTextNode(paragraphs[i]);
          pNode.appendChild(textNode);
          $scope.editor.summernote('insertNode', pNode);
        }
      };

      var getCurrentRange = function () {
        var sel;
        if (window.getSelection) {
          sel = window.getSelection();
          if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
          }
        } else if (document.selection && document.selection.createRange) {
          return document.selection.createRange();
        }
        return null;
      };

      var setCurrentRange = function (range) {
        var sel;
        if (range) {
          if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          } else if (document.selection && range.select) {
            //document.select is a legacy problem.
            range.select();
          }
        }
      };

      var insertImage = function (src, id) {
        setCurrentRange($scope.previousRange);

        src = src || 'http://img762.ph.126.net/LLzXH6ArV6ystmyvHmYy3g==/4884435270860289921.jpg';
        id = id || 1;

        var img = document.createElement('img');
        img.setAttribute('data-image-id', id);
        img.setAttribute('src', src);
        var div = document.createElement('div');
        div.appendChild(img);
        $scope.editor.summernote('insertNode', div);

        img.setAttribute('class', 'pre-loading');
        img.onload = function () {
          this.setAttribute('class', '');
        };
        img.onerror = function () {
          this.setAttribute('class', '');
        };


        $timeout(function () {
          $scope.editor.summernote('insertParagraph');
          div.setAttribute('contenteditable', false);
          $scope.setPreviousRange();
        }, 100);

      };

      //$scope.insertImage=insertImage;


      $scope.previousRange = null;

      $scope.setPreviousRange = function (evt) {
        $scope.previousRange = getCurrentRange();
      };
      $scope.onFocus = function (evt) {
        evt.target.addEventListener('mouseup', $scope.setPreviousRange);
      };


      //summerNote Image Upload

      var videoSuccessCallback = function (data) {
        var videoNode = $scope.editor.summernote('videoDialog.createVideoNode', data.videoUrl);
        videoNode.setAttribute('data-video-id', data.id);
        setCurrentRange($scope.previousRange);
        $scope.editor.summernote('insertNode', videoNode);
        $scope.setPreviousRange();
        $scope.reportData.video_assets = $scope.reportData.video_assets || [];
        $scope.reportData.video_assets.push(data.id);
      };


      var imageSuccessCallback = function (data) {
        insertImage(data.imageUrl, data.id);
        $scope.reportData.image_assets = $scope.reportData.image_assets || [];
        $scope.reportData.image_assets.push(data.id);
      };

      var errorCallback = function (error) {
        // Don't display error when user cancels upload
        if (error.status === -1) {
          return;
        }

        growl.error('Failed to upload');
      };

      $scope.imageUpload = function (files) {
        for (var i = 0; i < files.length; i++) {
          UploadService.uploadFile(files[i], 'REVIEW_REPORT_DETAILS', $scope)
            .then(function (data) {
              if (data.type === 'VIDEO') {
                videoSuccessCallback(data.data);
              } else {
                imageSuccessCallback(data.data)
              }
            }, errorCallback);
        }
      };

      $scope.transitionListen = true;

      $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {


        if (!$scope.transitionListen || $scope.reportForm.submitted) return;

        event.preventDefault();
        $scope.$emit('backdropOff', 'transition prevented');

        $scope.toState = toState;
        $scope.toParams = toParams;

        $scope.open('md');

      });

      $scope.open = function (size) {

        var modalInstance = $uibModal.open({
          templateUrl: 'views/modal/leave-prompt.html',
          controller: 'LeavePromptController',
          size: size,
          resolve: {
            title: function () {
              return 'report';
            }
          }
        });
        modalInstance.result.then(function (result) {
          $scope.transitionListen = false;
          $state.go($scope.toState, $scope.toParams);
        }, function (value) {
          console.info('Modal closed: ' + value);
        });
      };

      // Send project category to GA
      if (dataLayer) {
        dataLayer.push({
          projectCategory: $scope.applicant.review.project.categories[0].name
        });
      }
    }])
  .controller('ReviewReportVisualCtrl', function ($scope, $rootScope, $stateParams, report, ReviewReport, growl) {
    $scope.report = report;

    var title = report.title;
    var description = report.description;
    var backgroundColor = 'background-bg-light';
    var shareImage = report.image;
    $rootScope.pageSettings.setPage(title, description, backgroundColor, shareImage, true);
    $scope.tabs = [
      {title: 'detail', active: true},
      {title: 'comments', active: false}
    ];
    $scope.tabActive = 0;

    $scope.commentsTabActive = false;
    $scope.select = function (step) {
      $scope.commentsTabActive = false;
      switch (step) {
        case 'comments':
          $scope.commentsTabActive = true;
          break;
      }
    };
    $scope.approve = function () {
      $scope.$emit('backdropOn', 'approve project');
      ReviewReport.patch({id: report.id, reviewId: $stateParams.reviewId}, {is_approved: 'PENDING'}, function () {
        $scope.$emit('backdropOff', 'success');
        growl.success('review report is approved.');
      })
    };
  });
