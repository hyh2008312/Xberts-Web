'use strict';

angular.module('xbertsApp')
  .controller('ReportDetailCtrl', function ($scope, $rootScope, $stateParams, report, ReviewReport, growl, XBSocialShare, $location) {
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
    if ($scope.report.pros) {
      $scope.pros = $scope.report.pros.split('##');
    }
    if ($scope.report.cons) {
      $scope.cons = $scope.report.cons.split('##');
    }
    $scope.tabActive = 0;

    $scope.commentsTabActive = false;
    $scope.select = function (step) {
      $scope.commentsTabActive = false;
      switch (step) {
        case 'comments':
          $scope.commentsTabActive = true;
          break;
        default:
          $scope.commentsTabActive = false;
      }
    };
    $scope.approve = function () {
      $scope.$emit('backdropOn', 'approve project');
      ReviewReport.patch({id: report.id, reviewId: $stateParams.reviewId}, {is_approved: 'PENDING'}, function () {
        $scope.$emit('backdropOff', 'success');
        growl.success('review report is approved.');
      })
    };

    var search = $location.search();
    var tab = search.action || '';
    if (tab == 'share') {
      XBSocialShare.open('md',
        {
          title: $rootScope.pageSettings._title,
          description: $rootScope.pageSettings._description,
          image: $rootScope.pageSettings._shareImage,
          url: $rootScope.pageSettings.getUrl()
        }
      );
    }

    $scope.buyProduct = function() {
      // Send product id to GTM
      if (window.dataLayer && report.product_title) {
        window.dataLayer.push({
          event: 'buy-product-btn-click',
          productTitle: report.product_title
        });
      }

      window.open(report.buy_url);
    };

    // Send project category to GA
    if (dataLayer) {
      dataLayer.push({
        projectCategory: $scope.report.product_categories[0].name
      });
    }
  });
