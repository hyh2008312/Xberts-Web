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
        var pageSize = 0;
        this.minSize = _params.minSize || 1;
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
        this.setPageSize = function (size) {
          pageSize = size;
        };
        this.getPageSize = function () {
          return pageSize;
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
      _fetch: function (process) {
        self.setLoading(true);
        self.params.page = self.getCurrentPage() + 1;
        self.fetchFunction(self.params).then(function (resource) {
          self.setLoading(false);
          self.increaseCurrentPage();
          self.setNext(resource.next !== null);
          if (self.getPageSize() !== 0 && resource.next !== null) {
            self.setPageSize(resource.results.length)
          }
          process = process.concat(filterBy(orderBy(resource.results)));
          if (self.minSize < 1 || resource.next === null) {

          }
          self.items = self.items.concat(process);
          self.cache();
          deferred.resolve(self);
        });
      },
      _load: function (preload) {
        var process = [];
        var self = this;
        var deferred = $q.defer();
        //while (process.length < self.minSize) { // when asynchronous, do not using while-loop, except for listening
        if (!this.getNext() || this.getLoading()) {
          deferred.resolve(self);
        } else if (preload && this.items.length > 0) {
          deferred.resolve(self);
        } else {
          self.setLoading(true);
          self.params.page = self.getCurrentPage() + 1;
          self.fetchFunction(self.params).then(function (resource) {
            self.setLoading(false);
            self.increaseCurrentPage();
            self.setNext(resource.next !== null);
            if (self.getPageSize() !== 0 && resource.next !== null) {
              self.setPageSize(resource.results.length)
            }
            process = process.concat(filterBy(orderBy(resource.results)));
            self.items = self.items.concat(process);
            self.cache();
            deferred.resolve(self);
          });
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
