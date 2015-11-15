'use strict';

/**
 * @ngdoc service
 * @name yeodjangoApp.Paginator
 * @description
 * # Paginator
 * Factory in the yeodjangoApp.
 */
//todo: 优化，将watch(回调),load spin整合进来,加载出错信息
angular.module('yeodjangoApp')
  .factory('Paginator', ['localStorageService','$q', function (localStorageService,$q) {
    // Service logic
    // ...
    // Public API here
    return function (name, fetchFunction) {
      var paginator = {
        name: name,
        currentPage: localStorageService.get(name + '_currentPage') || 0,
        params:{},
        next: localStorageService.get(name + '_next') || 'true',
        items: localStorageService.get(name + '_items') || [],
        loading: false,
        hasNext: function () {
          return this.next === 'true';
        },
        load: function () {
          var delay = $q.defer();
          if (this.items.length>0 || !this.hasNext() || this.loading){
            return this;
          }
          var self = this;
          self.loading = true;
          fetchFunction(self.currentPage + 1,self.params, function (resource) {
            self.currentPage++;
            self.next = resource.next !== null ? 'true' : 'false';
            self.items = self.items.concat(resource.results);
            self.loading = false;
            localStorageService.set(self.name + '_currentPage', self.currentPage);
            localStorageService.set(self.name + '_items', self.items);
            localStorageService.set(self.name + '_next', self.next);
            delay.resolve(self);
          });
          return delay.promise;
        },
        loadNext: function () {
          if (!this.hasNext() || this.loading) return;
          var self = this;
          self.loading = true;
          fetchFunction(self.currentPage + 1,self.params, function (resource) {
            self.currentPage++;
            self.next = resource.next !== null ? 'true' : 'false';
            self.items = self.items.concat(resource.results);
            self.loading = false;
          });
        },
        watch: function ($scope, name) {
          var self = this;
          $scope.$watch(name, function () {
            localStorageService.set(self.name + '_currentPage', self.currentPage);
            localStorageService.set(self.name + '_items', self.items);
            localStorageService.set(self.name + '_next', self.next);
          });
        }
      };
      return paginator;
    };
  }]);
