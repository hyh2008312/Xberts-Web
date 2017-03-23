angular.module('xbertsApp')
  .factory('MainModel', MainModel);


function MainModel() {

  function MainModel(data) {
    angular.extend(this, data);
  }

  MainModel.prototype = {
    getReviewer: function () {
      return this.applicant.reviewer;
    }
  };

  MainModel.build = function (data) {
    return new MainModel(data)
  };

  MainModel.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return MainModel.build(item);
    });

    return data;
  };

  MainModel.buildList = function (data) {
    return data.map(function (item) {
      return MainModel.build(item);
    })
  };

  return MainModel;
}
