angular.module('xbertsApp')
  .factory('SearchModel',['$state','urlParser','$sce','SearchFactory',SearchModel]);
function SearchModel($state,urlParser,$sce,SearchFactory) {

  function SearchModel(data) {
    angular.extend(this, data);
  }

  SearchModel.prototype = {

  };

  SearchModel.build = function (data) {
    return new AskModel(data)
  };

  SearchModel.buildPageList = function (data) {

    if(data.from) {
      SearchFactory.from = data.form;
    }

    data.results = data.results.map(function (item) {
      return AskModel.build(item);
    });

    return data;
  };

  SearchModel.buildList = function (data) {
    return data.map(function (item) {
      return AskModel.build(item);
    })
  };

  return SearchModel;
}
