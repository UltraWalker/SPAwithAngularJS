(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var list = this;

        list.items = ShoppingListCheckOffService.get_items_to_buy();
        list.bought = function (itemIndex) {
            ShoppingListCheckOffService.justBoughtItem(itemIndex);
        };
	}

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var list = this;

        list.items = ShoppingListCheckOffService.get_items_already_bought();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        
        var items_to_buy = [
            {
                name: "Foo",
                quantity: 10
            },
            {
                name: "Bar",
                quantity: 20
            },
            {
                name: "Baz",
                quantity: 30
            }
        ];
        var items_already_bought = [
            {
                name: "Faz",
                quantity: 5
            }
        ];

        service.justBoughtItem = function (itemIndex) {
            // console.log(items_to_buy,items_already_bought);
            items_already_bought.push(items_to_buy[itemIndex]);
            items_to_buy.splice(itemIndex, 1);
            // console.log(items_to_buy,items_already_bought);
        };

        service.get_items_to_buy = function () {
            return items_to_buy;
        };

        service.get_items_already_bought = function () {
            return items_already_bought;
        };
    }

})();
