'use strict';

//todo: 优化，将watch(回调),load spin整合进来,加载出错信息
angular.module('xbertsApp')
  .factory('Paginator', ['localStorageService', '$q', '$filter', function (localStorageService, $q, $filter) {
    return function (paraObject) {
      var paginator = {
        name: paraObject.name,
        currentPage: localStorageService.get(name + '_currentPage') || 0,
        params: {},
        next: localStorageService.get(name + '_next') || 'true',
        items: localStorageService.get(name + '_items') || [],
        loading: false,
        ordering: null,
        filter: null,
        setOrder: function (ordering) {
          this.ordering = ordering;
        },
        setFilter: function (filter) {
          this.filter = filter;
        },
        orderBy: function (items) {
          var self = this;
          return self.ordering ? $filter('orderBy')(items, self.ordering) : items;
        },
        filterBy: function (items) {
          var self = this;
          return self.filter ? $filter('filter')(items, self.filter) : items;
        },
        hasNext: function () {
          return this.next === 'true';
        },
        cache: function () {
          localStorageService.set(self.name + '_currentPage', self.currentPage);
          localStorageService.set(self.name + '_items', self.items);
          localStorageService.set(self.name + '_next', self.next);
        },
        _afterLoad: function (resource) {
          this.currentPage++;
          this.next = resource.next !== null;
          this.items = this.items.concat(this.filterBy(this.orderBy(resource.results)));
          this.loading = false;
          this.cache();
        },
        load: function () {
          var self = this;
          var delay = $q.defer();
          if (this.items.length > 0 || !this.hasNext() || this.loading) {
            delay.resolve(self);
          }
          self.loading = true;
          self.params.page = self.currentPage + 1;
          fetchFunction(self.params).then(self._afterLoad).then(function () {
            delay.resolve(self);
          });
          return delay.promise;
        },
        loadNext: function () {
          if (!this.hasNext() || this.loading) return;
          var self = this;
          self.loading = true;
          fetchFunction(self.params).then(self._afterLoad);
        },
        clear: function () {
          this.currentPage = 0;
          this.next = 'true';
          this.items = [];
          this.cache();
        }
      };
      return paginator;
    };
  }]);
