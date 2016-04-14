'use strict';
angular.module('xbertsApp')
  .factory('Paginator', ['localStorageService', '$q', '$filter', function (localStorageService, $q, $filter) {
    function orderBy(items, ordering) {
      return ordering ? $filter('orderBy')(items, ordering) : items;
    }

    function filterBy(items, filter) {
      return filter ? $filter('filter')(items, filter) : items;
    }

    var Paginator = function (_params) {
      if (this instanceof Paginator) {
        this.name = _params.name;
        this.fetchFunction = _params.fetchFunction;
        this.params = _params.params || {};
        this.ordering = _params.ordering || '';
        this.filter = _params.filter || '';
        this.items = localStorageService.get(this.name + '_items') || [];

        var currentPage = localStorageService.get(this.name + '_currentPage') || 0;
        this.params.page = currentPage + 1;
        var next = !(localStorageService.get(this.name + '_next') === false);
        this.minSize = _params.minSize || 0;
        var loading = false;

        this.resetPaging = function () {
          currentPage = 0;
          next = true;
          this.items = [];
        };
        this.increaseCurrentPage = function () {
          currentPage += 1;
        };
        this.getCurrentPage = function () {
          return currentPage;
        };
        this.setNext = function (_next) {
          next = _next;
        };
        this.getNext = function () {
          return next;
        };
        this.setLoading = function (_loading) {
          loading = _loading;
        };
        this.getLoading = function () {
          return loading;
        };
      } else {
        return new Paginator(_params)
      }
    };
    Paginator.prototype = {
      constructor: Paginator,
      cache: function () {
        localStorageService.set(this.name + '_currentPage', this.getCurrentPage());
        localStorageService.set(this.name + '_items', this.items);
        localStorageService.set(this.name + '_next', this.getNext());
      },
      _fetch: function (deferred, _process) {
        // todo: multi-fetch for preparing enough data
        var process = _process || [];
        var self = this;
        self.params.page = self.getCurrentPage() + 1;
        self.fetchFunction(self.params).then(function (resource) {
          self.increaseCurrentPage();
          self.setNext(resource.next !== null);
          process = process.concat(filterBy(orderBy(resource.results, self.ordering), self.filter));
          if (self.minSize > 0 && resource.next !== null && process.length < self.minSize) {
            self._fetch(deferred, process);
          } else {
            self.items = self.items.concat(process);
            self.cache();
            self.setLoading(false);
            deferred.resolve(self);
          }
        });
      },
      _load: function (preload) {
        var self = this;
        var deferred = $q.defer();
        //while (process.length < self.minSize) { // when asynchronous, do not using loop
        if (!this.getNext() || this.getLoading()) {
          deferred.resolve(self);
        } else if (preload && this.items.length > 0) {
          deferred.resolve(self);
        } else {
          self.setLoading(true);
          self._fetch(deferred);
          //self.params.page = self.getCurrentPage() + 1;
          //self.fetchFunction(self.params).then(function (resource) {
          //  self.setLoading(false);
          //  self.increaseCurrentPage();
          //  self.setNext(resource.next !== null);
          //  self.items = self.items.concat(filterBy(orderBy(resource.results, self.ordering), self.filter));
          //  self.cache();
          //  deferred.resolve(self);
          //});
        }
        //}
        return deferred.promise;
      },
      load: function () {
        //preload
        return this._load(true);
      },
      loadNext: function () {
        return this._load(false);
      },
      clear: function () {
        this.resetPaging();
        this.cache();
      }
    };
    return Paginator
  }]);
