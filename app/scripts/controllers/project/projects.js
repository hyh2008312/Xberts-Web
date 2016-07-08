'use strict';

/**
 * @ngdoc function
 * @name xbertsApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the xbertsApp
 */
angular.module('xbertsApp')
  .controller('ProjectsCtrl', ['$scope', 'projectPaginator', '$rootScope', 'SystemData', 'localStorageService', 'growl', 'Interact',
    function ($scope, projectPaginator, $rootScope, SystemData, localStorageService, growl, Interact) {
      $rootScope.pageSettings.setBackgroundColor('');
      $scope.projectTypes = SystemData.getProjectTypes();
      $scope.otherConditions = [
        {value: "-date_published", label: "Sorted by: Latest"},
        {value: "-interact__vote_amount", label: "Popular"}];
      $scope.projectPaginator = projectPaginator;
      $scope.projects = {
        project_category_id: localStorageService.get('project_search_type') || '',
        ordering: localStorageService.get('project_search_order') || '-date_published'
      };
      $scope.onSearch = function () {
        $scope.projectPaginator.params = $scope.projects;
        $scope.projectPaginator.clear();
        $scope.projectPaginator.loadNext();
      };
      $scope.onClearSearch = function () {
        $scope.projects.search = '';
        $scope.onSearch();
      };
      $scope.onKeyDown = function ($event) {
        if ($event.keyCode === 13) {
          $scope.onSearch();
        }
      };
      $scope.$watch('projects.project_category_id + projects.ordering', function () {
        localStorageService.set('project_search_type', $scope.projects.project_category_id);
        localStorageService.set('project_search_order', $scope.projects.ordering);
      });

      console.log(projectPaginator.items);

      $scope.want = function (project) {
        console.log(project.interact.current_voter);
        var vote = !project.interact.current_voter.vote;
        //todo: 返还一个promise对象
        if (!$rootScope.user.authRequired()) {
          return
        }
        project.voting = true;
        if (vote) {
          project.interact.vote_amount += 1;
        } else {
          if (project.interact.current_voter.id !== undefined && project.interact.vote_amount > 0) {
            project.interact.vote_amount -= 1;
          }
        }
        var Join = Interact.Join({});
        var join;
        if (project.interact.current_voter.id === undefined) {
          join = new Join();
          join.interact = project.interact.id;
          join.vote = vote;
          join.$save(function (result) {
            project.voting = false;
            if (result.vote) {
              project.interact.voters.push(result);
              project.interact.current_voter = result;
            }
          }, function (error) {
            project.voting = false;
            growl.error('error');
          });
        } else {
          join = new Join(project.interact.current_voter);
          join.vote = vote;
          join.$vote(function (result) {
            project.voting = false;
            project.interact.current_voter = result;
            if (result.vote) {
              project.interact.voters.push(result);
            } else {
              for (var i = 0; i < project.interact.voters.length; i++) {
                if (project.interact.voters[i].id === result.id) {
                  project.interact.voters.splice(i, 1);
                }
              }
            }
          });
        }
      };
    }]);
