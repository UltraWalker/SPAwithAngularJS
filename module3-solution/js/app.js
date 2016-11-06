(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    // Custom Directive
    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'loader/itemsloaderindicator.template.html',
            scope : {
                list: '<',
                onRemove: '&'
            },
            link: NarrowItDownDirectiveLink
        };
        return ddo;
    }

    // Link
    function NarrowItDownDirectiveLink(scope, element, attrs, controller) {
        scope.$watch('list.loading', function (newValue, oldValue) {
            var loading_div = element.find("div")[0];
            if (newValue === true) {
              angular.element(loading_div).css('display', 'block');
            }
            else {
              angular.element(loading_div).css('display', 'none');
            }
        });
        scope.$watch('list.searchTermEmptyTried', function (newValue, oldValue) {
            var alert_div = element.find("div")[1];
            if(newValue)
                angular.element(alert_div).css('display', 'block');
            else
                angular.element(alert_div).css('display', 'none');
        });
        scope.$watch('list.resultEmpty', function (newValue, oldValue) {
            var alert_div = element.find("div")[1];
            if(newValue)
                angular.element(alert_div).css('display', 'block');
            else
                angular.element(alert_div).css('display', 'none');

        });
    }

    // Controller
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
        var searchCtrl = this;
        searchCtrl.found = [];
        searchCtrl.loading = false;
        searchCtrl.searchTermEmptyTried = false;
        searchCtrl.resultEmpty = false;

        searchCtrl.search = function() {
            searchCtrl.loading = true;
            if(searchCtrl.searchTerm === undefined || searchCtrl.searchTerm === "") {
                searchCtrl.found = [];
                searchCtrl.searchTermEmptyTried = true;
                searchCtrl.loading = false;
            }
            else {
                searchCtrl.searchTermEmptyTried = false;
            // if(searchCtrl.searchTerm !== undefined) {
                var promise = MenuSearchService.getMatchedMenuItems(searchCtrl.searchTerm);
                promise.then(function (foundedItems) {
                    searchCtrl.loading = false;
                    searchCtrl.found = foundedItems;
                    if(searchCtrl.found.length===0)
                        searchCtrl.resultEmpty = true;
                    else
                        searchCtrl.resultEmpty = false;
                })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
            }
        };

        searchCtrl.removeItem = function (itemIndex) {
            MenuSearchService.removeItem(itemIndex.index);
        };
	}

    // Service
    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;
        var foundItems = [];

        service.getMatchedMenuItems = function(searchTerm) {
            var response = $http({
              method: "GET",
              url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (result) {
                foundItems = [];
                angular.forEach(result.data.menu_items, function(value, key){
                    if(value.description.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1)
                        foundItems.push(value);
                });
                return foundItems;
            });

            return response;
        };

        service.removeItem = function (itemIndex) {
            foundItems.splice(itemIndex, 1);
        };

    }

})();
