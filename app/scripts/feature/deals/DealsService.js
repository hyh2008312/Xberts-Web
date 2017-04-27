angular.module('xbertsApp')
  .service('DealsService', ['$resource','ProductDeals','API_BASE_URL',function ($resource,ProductDeals,API_BASE_URL) {

    var dealsItem = {
      img:'https://xberts.imgix.net/project/cover/5DeiosWZtTyCEcm0pSVcZSRYStTeVjWe.jpg?auto=format%2Cenhance&crop=edges&fit=crop&h=500&ixlib=python-1.1.2&w=750&s=994d15dd5dc22b6dce408544109685ab',
      from: "Amazon",
      sale: "25.00",
      total: "50.00",
      title: "Save Big on Tom Clancy's Ghost Recon Wildlands",
      endTime: "Ends in 3:04:56",
      views: "1230",
      likes: "1230",
      buyUrl: ""
    };
    var dealsList = [];
    for(var i = 0; i < 8; i++) {
      dealsList.push(dealsItem);
    }
    this.getDealsList = function() {
      return dealsList;
    };

  }]);
