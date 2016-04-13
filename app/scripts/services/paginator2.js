'use strict';
angular.module('xbertsApp')
  .factory('Paginator_', ['localStorageService', '$q', '$filter', function (localStorageService, $q, $filter) {
    var Paginator = function (name, fetchFunction) {
      if (this instanceof Paginator) {
        this.name = name;
        this.fetchFunction = fetchFunction;
        var currentPage = localStorageService.get(name + '_currentPage') || 0;
        var params = {};
        var next = localStorageService.get(name + '_next') || 'true';
        var items = localStorageService.get(name + '_items') || [];
        var loading = false;
        var ordering = null;
        var filter = null;
      } else {
        return new Paginator(name, fetchFunction)
      }
    };
    Paginator.prototype = {
      constructor: Paginator,
      setOrder: function (ordering) {
        this.ordering = ordering;
      },
      setFilter: function (filter) {
        this.filter = filter;
      },
      orderBy: function (items) {
        return this.predicate ? $filter('orderBy')(items, this.ordering) : items;
      },
      filterBy: function (items) {
        return this.filter ? $filter('filter')(items, this.filter) : items;
      },
      hasNext: function () {
        return this.next === 'true';
      },
      load: function () {
        var delay = $q.defer();
        if (this.items.length > 0 || !this.hasNext() || this.loading) {
          return this;
        }
        var self = this;
        self.loading = true;
        this.fetchFunction(self.currentPage + 1, self.params, function (resource) {
          self.currentPage++;
          self.next = resource.next !== null ? 'true' : 'false';
          self.items = self.items.concat(self.filterBy(self.orderBy(resource.results)));
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
        fetchFunction(self.currentPage + 1, self.params, function (resource) {
          self.currentPage++;
          self.next = resource.next !== null ? 'true' : 'false';
          self.items = self.items.concat(self.filterBy(self.orderBy(resource.results)));
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
      },
      clear: function () {
        this.currentPage = 0;
        this.next = 'true';
        this.items = [];
      }
    };
    return Paginator
  }]);
