'use strict';

describe('Filter: projectCategory', function () {

  // load the filter's module
  beforeEach(module('xbertsApp'));

  // initialize a new instance of the filter before each test
  var projectCategory;
  beforeEach(inject(function ($filter) {
    projectCategory = $filter('projectCategory');
  }));

  it('should return the input prefixed with "projectCategory filter:"', function () {
    var text = 'angularjs';
    expect(projectCategory(text)).toBe('projectCategory filter: ' + text);
  });

});
