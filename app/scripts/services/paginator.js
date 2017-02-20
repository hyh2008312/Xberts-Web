'use strict';
angular.module('xbertsApp')
  .factory('Paginator', ['localStorageService', '$q', '$filter', function (localStorageService, $q, $filter) {
    function orderBy(items, ordering) {
      return ordering ? $filter('orderBy')(items, ordering) : items;
    }

    function filterBy(items, filter) {
      return filter ? $filter('filter')(items, filter) : items;
    }

    function Paginator(_params) {
      this.name = _params.name;
      this.fetchFunction = _params.fetchFunction;
      this.params = _params.params || {};
      this.ordering = _params.ordering || '';
      this.filter = _params.filter || '';
      this.objClass = _params.objClass || Object;

      var objClass = _params.objClass || Object;

      this.items = (localStorageService.get(this.name + '_items') || []).map(
        function (item) {
          var newItem = new objClass();
          angular.extend(newItem, item);
          return newItem;
        }
      );


      this.currentPage = localStorageService.get(this.name + '_currentPage') || 0;
      this.params.page = this.currentPage + 1;
      this.next = !(localStorageService.get(this.name + '_next') === false);
      this.minSize = _params.minSize || 0;
      this.loading = false;
      this.count = localStorageService.get(this.name + '_count') || null;
    }

    Paginator.prototype = {
      constructor: Paginator,
      resetPaging: function () {
        this.currentPage = 0;
        this.next = true;
        this.items = [];
      },
      cache: function () {
        localStorageService.set(this.name + '_currentPage', this.currentPage);
        localStorageService.set(this.name + '_items', this.items);
        localStorageService.set(this.name + '_next', this.next);
        localStorageService.set(this.name + '_count', this.count);
      },
      _fetch: function (deferred, _process) {
        // when using filter, there is a risk of fetching too many times, even the whole database
        var process = _process || [];
        var self = this;
        self.params.page = self.currentPage + 1;
        self.fetchFunction(self.params).then(function (resource) {
          self.count = resource.count;
          self.currentPage += 1;
          self.next = resource.next !== null;
          process = process.concat(filterBy(orderBy(resource.results, self.ordering), self.filter));
          process = process.map(function (item) {
            var newItem = new self.objClass();
            angular.extend(newItem, item);
            return newItem;
          });
          if (self.minSize > 0 && resource.next !== null && process.length < self.minSize) {
            self._fetch(deferred, process);
          } else {
            self.items = self.items.concat(process);
            self.cache();
            self.loading = false;
            deferred.resolve(self);
          }
        });
      },
      _load: function (preload) {
        var self = this;
        var deferred = $q.defer();
        if (!this.next || this.loading) {
          deferred.resolve(self);
        } else if (preload && this.items.length > 0) {
          deferred.resolve(self);
        } else {
          self.loading = true;
          self._fetch(deferred);
        }
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
