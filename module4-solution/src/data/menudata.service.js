(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  // console.log("data module service fired!")
	var service = this;
  var items = [];
  var item = null;

	service.getAllCategories = function () {
		var response = $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/categories.json"
    });
    // console.log('all categories retreived!');
    return response;
	}

	service.getItemsForCategory = function (shortName) {
		var response = $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json",
      params: { category: shortName }
    });
    if(shortName.length>0)
      console.log('all menus for category:' + shortName + ' retreived');
    else
      console.log("shortName was empty so actually all menus fetched!");
    return response;
	}	
}

})();
