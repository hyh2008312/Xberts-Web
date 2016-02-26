'use strict';

angular.module('xbertsApp')
  .controller('ProjectCtrl', ['$scope', '$rootScope', '$location', '$stateParams', '$uibModal', 'growl', 'SystemData',
    'Interact', 'ProjectOnlyDetail', 'Distributor', 'Paginator', 'project', 'distributions', 'Project', 'localStorageService', 'QuoteInquiry',
    function ($scope, $rootScope, $location, $stateParams, $uibModal, growl, SystemData,
              Interact, ProjectOnlyDetail, Distributor, Paginator, project, distributions, Project, localStorageService, QuoteInquiry) {
      $rootScope.bodyBackground = 'background-whitem';

      $scope.projectTypes = SystemData.getProjectTypes();
      $scope.targetGeos = SystemData.getTargetGeos();
      $scope.supportTypes = SystemData.getSupportTypes();
      $scope.transportationModels = SystemData.getTransportationModels();
      $scope.distributions = distributions;
      $scope.project = project;
      ProjectOnlyDetail.get({id: $stateParams.projectId}, function (result) {
        $scope.project.details = result.details;
      });
      //todo: 交互信息可能发生变化,重读交互信息
      // before entering into detail page, should the project interact info

      $scope.tabs = [
        {title: 'detail', active: true},
        {title: 'comments', active: false},
        {title: 'inquiries', active: false}
      ];

      $scope.commentsTabActive = false;
      $scope.applicationsTabActive = false;
      $scope.inquiresTabActive = false;
      $scope.select = function (step) {
        $scope.commentsTabActive = false;
        $scope.applicationsTabActive = false;
        switch (step) {
          case 'comments':
            $scope.commentsTabActive = true;
            break;
          case 'applications':
            $scope.applicationsTabActive = true;
            var fetchFunction1 = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, request__project_id: $scope.project.id};
              angular.extend(params, otherParams);
              Distributor.get(params, callback);
            };
            $scope.distributorsPaginator = Paginator('distributor_' + $scope.project.id, fetchFunction1);
            $scope.distributorsPaginator.clear();
            $scope.distributorsPaginator.loadNext();
            break;
          case 'inquiries':
            $scope.inquiresTabActive = true;
            var fetchFunction2 = function (nextPage, otherParams, callback) {
              var params = {page: nextPage, request__project_id: $scope.project.id};
              angular.extend(params, otherParams);
              QuoteInquiry.get(params, callback);
            };
            $scope.inquiriesPaginator = Paginator('inquiry_' + $scope.project.id, fetchFunction2);
            $scope.inquiriesPaginator.clear();
            $scope.inquiriesPaginator.loadNext();
            break;
        }
        $scope.$broadcast('project', step);
      };

      //modal

      $scope.inquiry = {exist: false};
      if ($rootScope.user.isAuth()) {
        QuoteInquiry.get({
          request_id: $scope.distributions[0].id,
          inquirer_id: $rootScope.user.getUserId()
        }, function (data) {
          if (data.count !== undefined && data.count > 0) {
            angular.extend($scope.inquiry, data.results[0]);
            $scope.inquiry.exist = true;
          }
        }, function () {

        })
      }

      $scope.open = function (size) {
        if (!$rootScope.user.authRequired()) {
          return;
        }
        var modalInstance = $uibModal.open({
          templateUrl: 'views/project/quotainquiryform.html',
          controller: 'QuoteInquiryCtrl',
          size: size,
          resolve: {
            distribution: function () {
              return $scope.distributions[0];
            }
          }
        });
        modalInstance.result.then(function (inquiry) {
          angular.extend($scope.inquiry, inquiry);
          $scope.inquiry.exist = true;
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };
      var search = $location.search();
      var tab = search.tab || 'detail';
      if (search.tab) {
        for (var i = 0; i < $scope.tabs.length; i++) {
          $scope.tabs[i].active = $scope.tabs[i].title === search.tab;
        }
      }

      $scope.approve = function (isApproved) {
        $scope.$emit('backdropOn', 'approve project');

        if (isApproved) {
          Project.approve.save({id: project.id},
            function () {
              project.interact.is_verified = '1';

              $scope.$emit('backdropOff', 'success');
              growl.success('Project is approved.');
              localStorageService.clearAll();
            },
            function () {
              $scope.$emit('backdropOff', 'error');
              growl.error('Oops! Something went wrong.');
            });
        } else {
          Project.approve.delete({id: project.id},
            function () {
              project.interact.is_verified = '2';

              $scope.$emit('backdropOff', 'success');
              growl.success('Project is rejected.');
              localStorageService.clearAll();
            },
            function () {
              $scope.$emit('backdropOff', 'error');
              growl.error('Oops! Something went wrong.');
            });
        }
      };

      SystemData.getSaleChannelsPromise();
    }])
  .controller('ProjectNoRequestCtrl', ['$scope', '$rootScope', '$stateParams', 'SystemData', 'Interact', 'ProjectOnlyDetail', 'Paginator', 'project',
    function ($scope, $rootScope, $stateParams, SystemData, Interact, ProjectOnlyDetail, Paginator, project) {
      $rootScope.bodyBackground = 'background-whitem';

      $scope.projectTypes = SystemData.getProjectTypes();
      $scope.project = project;
      ProjectOnlyDetail.get({id: $stateParams.projectId}, function (result) {
        $scope.project.details = result.details;
      });
      //todo: 交互信息可能发生变化,重读交互信息
      // before entering into detail page, should the project interact info

      $scope.tabs = [
        {title: 'detail', active: true},
        {title: 'comments', active: false}
      ];

      $scope.commentsTabActive = false;
      $scope.applicationsTabActive = false;
      $scope.select = function (step) {
        $scope.commentsTabActive = false;
        $scope.applicationsTabActive = false;
        switch (step) {
          case 'comments':
            $scope.commentsTabActive = true;
            break;
        }
        $scope.$broadcast('project', step);
      };
    }])
  .controller('QuoteInquiryCtrl', function ($scope, $rootScope, distribution, QuoteInquiry, $uibModalInstance, growl) {
    $scope.quoteInquiry = new QuoteInquiry();
    $scope.quoteInquiry.request = distribution.id;
    $scope.quoteInquiry.inquirer = $rootScope.user.getUserId();
    $scope.quoteInquiryFormSubmit = function () {
      if ($scope.quoteInquiryForm.$valid) {
        $scope.$emit('backdropOn', 'post');

        $scope.quoteInquiry.$save(function (resp) {
          $scope.$emit('backdropOff', 'success');
          growl.success('Thanks, your request has been submitted successfully!');
          $uibModalInstance.close($scope.quoteInquiry);
        }, function (resp) {
          growl.error('Sorry,some error happened.');
          $scope.$emit('backdropOff', 'error');
        });

      } else {
        $scope.quoteInquiryForm.submitted = true;
        $scope.quoteInquiryForm.$invalid = true;
      }
    };
  });
